/* Tests for the levenshtein logic. */
var expect = require('chai').expect;
var wuzzy = require('../index');

describe('levenshtein tests', function () {
	it('should correctly calcuate the levenshtein distance', function () {
		var tests = [
			{
				a: ['M', 'A', 'R', 'T', 'H', 'A'],
				b: ['M', 'A', 'R', 'H', 'T', 'A'],
				exp: 4 / 6
			},
			{
				a: 'MARTHA',
				b: 'MARHTA',
				exp: 4 / 6
			}, 
			{
				a: ['D', 'W', 'A', 'Y', 'N', 'E'],
				b: ['D', 'U', 'A', 'N', 'E'],
				exp: 4 / 6
			},
			{
				a: 'DWAYNE',
				b: 'DUANE',
				exp: 4 / 6
			},
			{
				a: ['D', 'I', 'X', 'O', 'N'],
				b: ['D', 'I', 'C', 'K', 'S', 'O', 'N', 'X'],
				exp: 4 / 8
			},
			{
				a: 'DIXON',
				b: 'DICKSONX',
				exp: 4 / 8
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
				exp: 4 / 8,
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
				exp: 4 / 6,
				eql: function (a, b) {
					return a.x === b.x && a.y === b.y;
				}
			}
		];
		tests.forEach(function (el) {
			var actual;

			if (el.eql) {
				actual = wuzzy.levenshtein(el.a, el.b, null, el.eql);
			} else {
				actual = wuzzy.levenshtein(el.a, el.b);
			}

			expect(actual).to.equal(el.exp);
		});
	});
});