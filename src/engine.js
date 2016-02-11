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
