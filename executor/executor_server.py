import json
from flask import Flask, request, jsonify
import executor_util as eu
app = Flask(__name__)

@app.route("/")
def hello():
    return "hello..hola..banana.."

@app.route("/buildrun", methods=["POST"])
def buildrun():
	data = json.loads(request.data)
	if 'code' not in data or 'lang' not in data:
		return "code/lang is missing!"
	code = data['code']
	lang = data['lang']
	print "5000***********: REST: %s in %s language" % (code, lang)
	result = eu.buildrun(code, lang)
	return jsonify(result)

if __name__=="__main__":
	eu.load_image()
	app.run(debug=True)