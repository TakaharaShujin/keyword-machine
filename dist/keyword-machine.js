/**
 * keyword-machine
 * Javascript ile otomatik meta key oluşturma elentisi
 * @version v0.0.1 - 2016-02-11
 * @link https://github.com/TakaharaShujin/keyword-machine
 * @author Üsame Fethullah AVCI <usameavci@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(window) {

	var KeymacUtils = {
		getPercents: function($arr) {
			return _.unique($arr.map(function($item) {
				return $item.percent;
			}));
		},
		concatPercents: function($arr1, $arr2, $reverseSort) {
			$sortType = $reverseSort || false;
			$result = _.sortBy(_.union($arr1, $arr2));
			if (!!$sortType) {
				return $result.reverse();
			}
			return $result;
		},
		getRanges: function($percents, $balance) {
			$tmpRanges = [];
			$percents.map(function($percent) {
				$from = (parseInt($percent) - parseInt($balance));
				$from = $from < 0 ? 0 : $from;
				$to = (parseInt($percent) + parseInt($balance));
				$to = $to > 100 ? 100 : $to;
				$tmpRanges.push({
					base: $percent,
					from: $from,
					to: $to
				});
			});
			return $tmpRanges;
		},
		getRangeFiltered: function($arr, $range) {
			return $arr.filter(function($item) {
				return ($range.from <= $item.percent) && ($item.percent <= $range.to);
			});
		},
		getRangeResults: function($allRanges, $adjList, $nounList) {
			$instance = this;
			$tmpResults = [];
			$allRanges.map(function($range) {
				$adjListFiltered = $instance.getRangeFiltered($adjList, $range);
				$nounListFiltered = $instance.getRangeFiltered($nounList, $range);
				$tmpResults.push({
					percent: $range.base,
					adjectives: $adjListFiltered,
					nouns: $nounListFiltered
				});
			});
			return $tmpResults;
		},
		randItem: function($arr) {
			return $arr[_.random(0, ($arr.length - 1))];
		},
		thinkOdds: function($results, $length) {
			$instance = this;
			$tmpOdds = [];
			$results.map(function($result) {
				if ($result.adjectives.length > 0 && $result.nouns.length > 0) {
					$result.adjectives.forEach(function($adj, $i) {
						$result.nouns.forEach(function($noun, $ix) {
							$tmpOdd = {
								adjective: $adj.label,
								noun: $noun.label,
								score: (parseInt($adj.percent) + parseInt($noun.percent))
							};
							$tmpOdds.push($tmpOdd);
						});
					});
				}
			});
			return _.sortBy($tmpOdds, 'score').reverse();
		},
		generateKeywords: function($odds) {
			$keywodString = "";
			$odds.map(function($odd) {
				$tmpCompiled = $odd.adjective + ' ' + $odd.noun + ', ';
				if ($keywodString.indexOf($tmpCompiled) == -1) {
					$keywodString += $tmpCompiled;
				}
			});
			$keywodString = $keywodString.trim();
			return $keywodString.substring(0, ($keywodString.length - 1));
		}
	};

	window.KeymacUtils = KeymacUtils;

})(window);

(function(window) {
	var Keymac = function() {
		var $self = this;
		this.adjList = [];
		this.nounList = [];
		this.oddsBalance = 10;

		this.balance = function($balance) {
			$self.oddsBalance = $balance;
		};

		this.adj = function($label, $percent) {
			var _adj = {};
			if (!$label) {
				throw new Error("Please set adjective label :/");
			} else {
				_adj.label = $label;
			}
			_adj.percent = $percent || 0;
			if (_adj.percent > 100) {
				throw new Error("Percent max value must be 100.");
			} else if (_adj.percent < 0) {
				throw new Error("Percent min value must be 0(zero);.");
			}
			$self.adjList.push(_adj);
		};

		this.noun = function($label, $percent) {
			var _noun = {};
			if (!$label) {
				throw new Error("Please set noun label :/");
			} else {
				_noun.label = $label;
			}
			_noun.percent = $percent || 0;
			if (_noun.percent > 100) {
				throw new Error("Percent max value must be 100.");
			} else if (_noun.percent < 0) {
				throw new Error("Percent min value must be 0(zero);.");
			}
			$self.nounList.push(_noun);
		};

		this.list = function() {
			$adjPercents = KeymacUtils.getPercents($self.adjList);
			$nounPercents = KeymacUtils.getPercents($self.nounList);
			$allPercents = KeymacUtils.concatPercents($adjPercents, $nounPercents, true);
			$allRanges = KeymacUtils.getRanges($allPercents, $self.oddsBalance);
			$rangeResults = KeymacUtils.getRangeResults($allRanges, $self.adjList, $self.nounList);
			$thinkOdds = KeymacUtils.thinkOdds($rangeResults, 200);
			$superKeywords = KeymacUtils.generateKeywords($thinkOdds);
			return $superKeywords;
		};
	};

	window.Keymac = Keymac;

})(window);
