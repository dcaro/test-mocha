var assert = require('assert');
	execSync = require('child_process').execSync,
	fs = require('fs');
	fileName = '2016-05-19-template.md'


function getModifiedFiles() {

};



describe("Check Files modified", function(){
	it("Files should exist", function () {
			
  assert.ok(process.env.TRAVIS_COMMIT_RANGE, 'VALIDATE_MODIFIED_ONLY requires TRAVIS_COMMIT_RANGE to be set to [START_COMMIT_HASH]...[END_COMMIT_HASH]');
  var stdout = execSync('git diff --name-only ' + process.env.TRAVIS_COMMIT_RANGE, {
    encoding: 'utf8'
  });
  var lines = stdout.split('\n');
  var result = {};

  for (var i = 0; i < lines.length; i += 1) {
    result[lines[i]] = lines[i];
  }

  return result;

	});
});

describe("Check Front Matter", function(){
 	var contents = fs.readFileSync(fileName, 'UTF8');
	it("Verify presence of tags", function () {
			
		//frontmatter = /---\s*([\s\S]*?)\s*---/
		frontmatter = /---\s*((layout:)+)([\s\S]*?)((title:)+)([\s\S]*?)((author:)+)([\s\S]*?)((date:)+)([\s\S]*?)((color: "blue")+)([\s\S]*?)((excerpt:)+)([\s\S]*?)\s*---/
		assert.ok (frontmatter.test(contents));

	});
});

describe("Content of the MD file", function(){
 	var contents = fs.readFileSync(fileName, 'UTF8');
	it("Verify customer profile", function () {			
		pattern = /\s*((## [Cc]ustomer [Pp]rofile ##)+)([\s\S]*?)\s*/
		assert.ok (pattern.test(contents));
	});
	
	it("Verify conclusion", function () {
		pattern = /\s*((## [Cc]onclusion ##)+)([\s\S]*?)\s*/
		assert.ok (pattern.test(contents));

	});

		it("Verify resources", function () {
		pattern = /\s*((## [Rr]esources ##)+)([\s\S]*?)\s*/
		assert.ok (pattern.test(contents));

	});
});



