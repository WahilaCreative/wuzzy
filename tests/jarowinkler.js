/* Tests for the jaro-winkler logic. */
var expect = require('chai').expect;
var wuzzy = require('../index');

describe('jaro-winkler tests', function () {
	it('should correctly calcuate the jaro-winkler distance', function () {
		var tests = [
			{
				a: ['M', 'A', 'R', 'T', 'H', 'A'],
				b: ['M', 'A', 'R', 'H', 'T', 'A'],
				exp: 0.961
			}, 
			{
				a: 'MARTHA',
				b: 'MARHTA',
				exp: 0.961
			}, 
			{
				a: ['D', 'W', 'A', 'Y', 'N', 'E'],
				b: ['D', 'U', 'A', 'N', 'E'],
				exp: 0.840
			},
			{
				a: 'DWAYNE',
				b: 'DUANE',
				exp: 0.840
			},
			{
				a: ['D', 'I', 'X', 'O', 'N'],
				b: ['D', 'I', 'C', 'K', 'S', 'O', 'N', 'X'],
				exp: 0.813
			},
			{
				a: 'DIXON',
				b: 'DICKSONX',
				exp: 0.813
			},
			{
				a: ['J', 'O', 'E'],
				b: ['M', 'A', 'T', 'T'],
				exp: 0
			},
			{
				a: 'JOE',
				b: 'MATT',
				exp: 0
			},
			{
				a: ['J', 'O', 'E'],
				b: ['J', 'O', 'E'],
				exp: 1
			},
			{
				a: 'JOE',
				b: 'JOE',
				exp: 1
			},
			{
				a: [{
					x: 'D'
				}, {
					x: 'I'
				}, {
					x: 'X'
				}, {
					x: 'O'
				}, {
					x: 'N'
				}],
				b: [{
					x: 'D'
				}, {
					x: 'I'
				}, {
					x: 'C'
				}, {
					x: 'K'
				}, {
					x: 'S'
				}, {
					x: 'O'
				}, {
					x: 'N'
				}, {
					x: 'X'
				}],
				exp: 0.813,
				eql: function (a, b) {
					return a.x === b.x;
				}
			},
			{
				a: [{
					x: 'M',
					y: 1
				}, {
					x: 'A',
					y: 2,
				}, {
					x: 'R',
					y: 3,
				}, {
					x: 'T',
					y: 1
				}, {
					x: 'H',
					y: 2
				}, {
					x: 'A',
					y: 2
				}],
				b: [{
					x: 'M',
					y: 1
				}, {
					x: 'A',
					y: 2
				}, {
					x: 'R',
					y: 3
				}, {
					x: 'H',
					y: 2
				}, {
					x: 'T',
					y: 1
				}, {
					x: 'A',
					y: 2
				}],
				exp: 0.961,
				eql: function (a, b) {
					return a.x === b.x && a.y === b.y;
				}
			}
		];
		tests.forEach(function (el) {
			var actual;

			if (el.eql) {
				actual = Number(wuzzy.jarowinkler(el.a, el.b, null, el.eql).toFixed(3));
			} else {
				actual = Number(wuzzy.jarowinkler(el.a, el.b).toFixed(3))
			}

			expect(actual).to.equal(el.exp);
		});
	});
});