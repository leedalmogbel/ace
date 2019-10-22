const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class ListFilteredClips extends Operation {
  constructor({ AnalyticsRepository }) {
    super();
    this.AnalyticsRepository = AnalyticsRepository;
  }

  async execute(videoId) {
    const { SUCCESS, NOT_FOUND } = this.events;
    console.log(videoId);

    try {
      const clips = await this.AnalyticsRepository.testCount(videoId);
      const c = clips[0];

      const filtered = {
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
          dropShot: c. dropShot
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

      console.log('test output', filtered)
      const data = Utils().resSuccess(filtered);
      return this.emit(SUCCESS, data);
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
