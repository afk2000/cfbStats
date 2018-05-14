import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import { isTest } from 'apollo-utilities';

// This file is all about Sequelize. Not so much graphQL...
const db = new Sequelize('cfbStats', '', '', {
  host: 'cbfstats.database.windows.net',
  dialect: 'mssql',
  freezeTableName: true,
  timestamps: false,
  dialectOptions: {
    encrypt: true,
    freezeTableName: true
  }
});

// IMHO models should probably be defined in their own files. Putting them here to get shit done for now.
const PlayerModel = db.define('player', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  uniformNumber: { type: Sequelize.INTEGER },
  class: { type: Sequelize.STRING },
  position: { type: Sequelize.STRING },
  height: { type: Sequelize.INTEGER },
  weight: { type: Sequelize.INTEGER },
  homeTown: { type: Sequelize.STRING },
  homeState: { type: Sequelize.STRING },
  homeCountry: { type: Sequelize.STRING },
  lastSchool: { type: Sequelize.STRING },

});

const GameModel = db.define('game', {
  gameDate: { type: Sequelize.DATE },
  site: { type: Sequelize.STRING },
  homeTeamId: { type: Sequelize.INTEGER }
});

const PlayerGameStatisticModel = db.define('playerGameStatistic', {
  rushAttempt: { type: Sequelize.INTEGER },
  rushYards: { type: Sequelize.INTEGER },
  rushTd: { type: Sequelize.INTEGER },
  passAtt: { type: Sequelize.INTEGER },
  passComp: { type: Sequelize.INTEGER },
  passYard: { type: Sequelize.INTEGER },
  passTd: { type: Sequelize.INTEGER },
  passInt: { type: Sequelize.INTEGER },
  passConv: { type: Sequelize.INTEGER },
  rec: { type: Sequelize.INTEGER },
  recYards: { type: Sequelize.INTEGER },
  recTd: { type: Sequelize.INTEGER },
  kickoffRet: { type: Sequelize.INTEGER },
  kickoffRetYards: { type: Sequelize.INTEGER },
  kickoffRetTd: { type: Sequelize.INTEGER },
  puntRet: { type: Sequelize.INTEGER },
  puntRetYard: { type: Sequelize.INTEGER },
  puntRetTd: { type: Sequelize.INTEGER },
  fumRet: { type: Sequelize.INTEGER },
  fumRetYard: { type: Sequelize.INTEGER },
  fumRetTd: { type: Sequelize.INTEGER },
  intRet: { type: Sequelize.INTEGER },
  intRetYard: { type: Sequelize.INTEGER },
  intRetTd: { type: Sequelize.INTEGER },
  miscRet: { type: Sequelize.INTEGER },
  miscRetYard: { type: Sequelize.INTEGER },
  miscRetTd: { type: Sequelize.INTEGER },
  fieldGoalAtt: { type: Sequelize.INTEGER },
  fieldGoalMade: { type: Sequelize.INTEGER },
  offXpKickAtt: { type: Sequelize.INTEGER },
  offXpKickMade: { type: Sequelize.INTEGER },
  off2XPAtt: { type: Sequelize.INTEGER },
  off2XPMade: { type: Sequelize.INTEGER },
  def2XPAtt: { type: Sequelize.INTEGER },
  def2XPMade: { type: Sequelize.INTEGER },
  safety: { type: Sequelize.INTEGER },
  points: { type: Sequelize.INTEGER },
  punt: { type: Sequelize.INTEGER },
  puntYard: { type: Sequelize.INTEGER },
  kickoff: { type: Sequelize.INTEGER },
  kickoffYard: { type: Sequelize.INTEGER },
  kickoffTouchback: { type: Sequelize.INTEGER },
  kickoffOutOfBounds: { type: Sequelize.INTEGER },
  kickoffOnside: { type: Sequelize.INTEGER },
  fumble: { type: Sequelize.INTEGER },
  fumbleLost: { type: Sequelize.INTEGER },
  tackleSolo: { type: Sequelize.INTEGER },
  tackleAssist: { type: Sequelize.INTEGER },
  tackleForLoss: { type: Sequelize.INTEGER },
  tackleForLossYard: { type: Sequelize.INTEGER },
  sack: { type: Sequelize.INTEGER },
  sackYard: { type: Sequelize.INTEGER },
  qBHurry: { type: Sequelize.INTEGER },
  fumbleForced: { type: Sequelize.INTEGER },
  passBrokenUp: { type: Sequelize.INTEGER },
  kickPuntBlocked: { type: Sequelize.INTEGER }
})

const TeamModel = db.define('team', {
  name: { type: Sequelize.STRING }
})

const ConferenceModel = db.define('conference', {
  name: { type: Sequelize.STRING }
})

const StadiumModel = db.define('stadium', {
  name: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  state: { type: Sequelize.STRING },
  capacity: { type: Sequelize.INTEGER },
  surface: { type: Sequelize.STRING },
  yearOpened: { type: Sequelize.INTEGER }
})

StadiumModel.hasMany(GameModel);
GameModel.belongsTo(StadiumModel);
ConferenceModel.hasMany(TeamModel);
TeamModel.belongsTo(ConferenceModel);
TeamModel.hasMany(PlayerModel);
PlayerModel.belongsTo(TeamModel);
PlayerModel.hasMany(PlayerGameStatisticModel);
PlayerGameStatisticModel.belongsTo(PlayerModel);
GameModel.hasMany(PlayerGameStatisticModel);
// GameModel.belongsToMany(TeamModel, { foreignKey: 'homeTeamId', sourceKey: 'id', through: 'HomeTeam' });

GameModel.belongsTo(TeamModel, { targetKey: 'id', foreignKey: 'homeTeamId', as: 'HomeTeam' })
GameModel.belongsTo(TeamModel, { targetKey: 'id', foreignKey: 'visitTeamId', as: 'VisitTeam' })
// GameModel.hasOne(TeamModel, {foreignKey: 'id', targetKey: 'homeTeamId', as: 'HomeTeam'});
// GameModel.hasOne(TeamModel, {foreignKey: 'id', targetKey: 'visitTeamId'});
PlayerGameStatisticModel.belongsTo(GameModel);

export const Player = db.models.player;
export const Game = db.models.game;
export const PlayerGameStatistic = db.models.playerGameStatistic
export const Team = db.models.team
