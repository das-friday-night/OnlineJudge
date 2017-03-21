import docker
import uuid
import os
import shutil

from docker.errors import *

IMAGE_NAME = "siyuanli/onlinejudge"
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = "%s/tmp/" % CURRENT_DIR
SOURCE_FILE_NAMES = {
    "java" : "Solution.java",
    "python" : "test.py",
    "c++" : "test.cpp"
}

BINARY_FILE_NAMES = {
    "java" : "Solution",
    "python" : "test.py",
    "c++" : "a.out"
}

BUILD_COMMANDS = {
    "java" : "javac",
    "python" : "python",
    "c++" : "g++"
}

EXECUTE_COMMANDS = {
    "java" : "java",
    "python" : "python",
    "c++" : "./"
}

client = docker.from_env()

def load_image():
    try:
        client.images.get(IMAGE_NAME)
    except docker.errors.ImageNotFound:
        print "5000***********: no local image, load image from repo"
        client.images.pull(IMAGE_NAME)
    except docker.errors.APIError:
        print "5000***********: API Error "
        return
    print "5000***********: Image:[%s] loaded" % IMAGE_NAME

def buildrun(code, lang):
    try:
        result = {'build': None, 'run': None}
        source_file_parent_dir_name = uuid.uuid4()
        source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)
        source_file_guest_dir = "/test/%s" % source_file_parent_dir_name
        os.makedirs(source_file_host_dir)
        with open("%s/%s" % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), "w") as source_file:
            source_file.write(code)

    except OSError:
        print "5000***********:\n%s already exist" % source_file_host_dir

    # build the source code
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print "5000***********: Source built SUCCESS."
        result['build'] = 'OK'
    except ContainerError as e:
        print "5000***********: Source build FAILED!"
        result['build'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    # run the code
    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (EXECUTE_COMMANDS[lang], BINARY_FILE_NAMES[lang]),
            volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print "5000***********: Executed SUCCESS."
        result['run'] = log
    except ContainerError as e:
        print "5000***********: Executed FAILED!"
        result['run'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result
