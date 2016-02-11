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
				$keywodString += $odd.adjective + ' ' + $odd.noun + ', ';
			});
			$keywodString = $keywodString.trim();
			return $keywodString.substring(0, ($keywodString.length - 1));
		}
	};

	window.KeymacUtils = KeymacUtils;

})(window);
