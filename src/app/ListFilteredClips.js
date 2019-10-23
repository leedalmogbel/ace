const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class ListFilteredClips extends Operation {
  constructor({ AnalyticsRepository, FilterRepository }) {
    super();
    this.AnalyticsRepository = AnalyticsRepository;
    this.FilterRepository = FilterRepository;
  }

  async execute(data) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const filtered = await this.FilterRepository.getByFilter(data);
      const clips = await this.AnalyticsRepository.testCount(data);
      const c = clips[0];

      const totalShotType = parseInt(c.backhand)+parseInt(c.forehand)+parseInt(c.volley)+parseInt(c.overhead);
      const percentBackhand = parseFloat(parseInt(c.backhand)/totalShotType).toFixed(2);
      const percentForehand = parseFloat(parseInt(c.forehand)/totalShotType).toFixed(2);
      const percentVolley = parseFloat(parseInt(c.volley)/totalShotType).toFixed(2);
      const percentOverhead = parseFloat(parseInt(c.overhead)/totalShotType).toFixed(2);
      
      const totalShotResult = parseInt(c.ace)+parseInt(c.doubleFault)+parseInt(c.winner)+parseInt(c.unforcedError)+parseInt(c.forcedError)+parseInt(c.smartPattern)+parseInt(c.others);
      const percentAce = parseFloat(parseInt(c.ace)/totalShotResult).toFixed(2);
      const percentDoubleFault = parseFloat(parseInt(c.doubleFault)/totalShotResult).toFixed(2);
      const percentWinner = parseFloat(parseInt(c.winner)/totalShotResult).toFixed(2);
      const percentUnforceError = parseFloat(parseInt(c.unforcedError)/totalShotResult).toFixed(2);
      const percentForceError = parseFloat(parseInt(c.forcedError)/totalShotResult).toFixed(2);
      const percentSmartPattern = parseFloat(parseInt(c.smartPattern)/totalShotResult).toFixed(2);
      const percentOthers = parseFloat(parseInt(c.others)/totalShotResult).toFixed(2);

      const totalHitSpot = parseInt(c.behindBaseline)+parseInt(c.onBaseline)+parseInt(c.insideBaseline)+parseInt(c.insideServiceLine);
      const percentBehindBaseline = parseFloat(parseInt(c.behindBaseline)/totalHitSpot).toFixed(2);
      const percentOnBaseline = parseFloat(parseInt(c.onBaseline)/totalHitSpot).toFixed(2);
      const percentInsideBaseLine = parseFloat(parseInt(c.insideBaseline)/totalHitSpot).toFixed(2);
      const percentInsideServiceLine = parseFloat(parseInt(c.insideServiceLine)/totalHitSpot).toFixed(2);

      const totalErrLoc = parseInt(c.intoNet)+parseInt(c.long)+parseInt(c.wide)+parseInt(c.NA);
      const percentIntoNet = parseFloat(parseInt(c.intoNet)/totalErrLoc).toFixed(2);
      const percentLong = parseFloat(parseInt(c.long)/totalErrLoc).toFixed(2);
      const percentWide = parseFloat(parseInt(c.wide)/totalErrLoc).toFixed(2);
      const percentNA = parseFloat(parseInt(c.NA)/totalErrLoc).toFixed(2);

      const totalSpin = parseInt(c.lob)+parseInt(c.topspin)+parseInt(c.flat)+parseInt(c.underspin)+parseInt(c.dropShot);
      const percentLob = parseFloat(parseInt(c.lob)/totalSpin).toFixed(2);
      const percentTopspin = parseFloat(parseInt(c.topspin)/totalSpin).toFixed(2);
      const percentFlat = parseFloat(parseInt(c.flat)/totalSpin).toFixed(2);
      const percentUnderspin = parseFloat(parseInt(c.underspin)/totalSpin).toFixed(2);
      const percentDropShot= parseFloat(parseInt(c.dropShot)/totalSpin).toFixed(2);

      const totalShotDir = parseInt(c.crossCourt)+parseInt(c.downTheLine)+parseInt(c.insideOut)+parseInt(c.insideIn);
      const percentCrossCourt = parseFloat(parseInt(c.crossCourt)/totalShotDir).toFixed(2);
      const percentDownTheLine = parseFloat(parseInt(c.downTheLine)/totalShotDir).toFixed(2);
      const percentInsideOut = parseFloat(parseInt(c.insideOut)/totalShotDir).toFixed(2);
      const percentInsideIn = parseFloat(parseInt(c.insideIn)/totalShotDir).toFixed(2);

      const totalSpeed = parseInt(c.tooHard)+parseInt(c.tooSoft);
      const percentHard = parseFloat(parseInt(c.tooHard)/totalSpeed).toFixed(2);
      const percentSoft = parseFloat(parseInt(c.tooSoft)/totalSpeed).toFixed(2);

      const counts = {
        shotType: {
          backhand: c.backhand,
          forehand: c.forehand,
          volley: c.volley,
          overhead: c.overhead
        },
        shotResult: {
          ace: c.ace,
          doubleFault: c.doubleFault, 
          winner: c.winner, 
          unforcedError: c.unforcedError, 
          forcedError: c.forcedError, 
          smartPattern: c.smartPattern, 
          others: c.others
        },
        hitSpot: {
          behindBaseline: c.behindBaseline,
          onBaseline: c.onBaseline,
          insideBaseline: c.insideBaseline,
          insideServiceLine: c.insideServiceLine 
        },
        errorLocation: {
          intoNet: c.intoNet,
          long: c.long,
          wide: c.wide,
          NA: c.NA
        },
        spin: {
          lob: c.lob,
          topspin: c.topspin,
          flat: c.flat,
          underspin: c.underspin,
          dropShot: c.dropShot
        },
        shotDirection: {
          crossCourt: c.crossCourt,
          downTheLine: c.downTheLine,
          insideOut: c.insideOut,
          insideIn: c.insideIn
        },
        speed: {
          tooHard: c.tooHard,
          tooSoft: c.tooSoft
        }
      };

      const percentage = {
        shotType: {
          backhand: percentBackhand,
          forehand: percentForehand,
          volley: percentVolley,
          overhead: percentOverhead
        },
        shotResult: {
          ace: percentAce,
          doubleFault: percentDoubleFault, 
          winner: percentWinner, 
          unforcedError: percentUnforceError, 
          forcedError: percentForceError, 
          smartPattern: percentSmartPattern, 
          others: percentOthers
        },
        hitSpot: {
          behindBaseline: percentBehindBaseline,
          onBaseline: percentOnBaseline,
          insideBaseline: percentInsideBaseLine,
          insideServiceLine: percentInsideServiceLine
        },
        errorLocation: {
          intoNet: percentIntoNet,
          long: percentLong,
          wide: percentWide,
          NA: percentNA
        },
        spin: {
          lob: percentLob,
          topspin: percentTopspin,
          flat: percentFlat,
          underspin: percentUnderspin,
          dropShot: percentDropShot
        },
        shotDirection: {
          crossCourt: percentCrossCourt,
          downTheLine: percentDownTheLine,
          insideOut: percentInsideOut,
          insideIn: percentInsideIn
        },
        speed: {
          tooHard: percentHard,
          tooSoft: percentSoft
        }
      };

      const filtering = {
        filtered,
        counts,
        percentage
      };

      console.log('test output', filtering)
      const newData = Utils().resSuccess(filtering);
      return this.emit(SUCCESS, newData);
    } catch(error) { 
      console.log('line 19 beybe',error);
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListFilteredClips.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListFilteredClips;
