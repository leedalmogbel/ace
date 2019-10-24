const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils');

class ListAnalytics extends Operation {
  constructor({ VideoRepository, MatchRepository, ClipRepository, }) {
    super();
    this.VideoRepository = VideoRepository;
    this.MatchRepository = MatchRepository;
    this.ClipRepository = ClipRepository;
  }

  async execute(videoId, set) {
    const { SUCCESS, ERROR } = this.events;
    try {
      const video = await this.VideoRepository.getVideoName(videoId);
      const clips = await this.ClipRepository.getClipAnalytics(videoId, set);
      const match = await this.MatchRepository.getAll();
      const analytics = {
        videoName: video[0].videoName,
        clips,
      };

      const data = Utils().resSuccess(analytics);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListAnalytics.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListAnalytics;
