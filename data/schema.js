import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers'

const typeDefs = `
type Query {
  player(firstName: String, lastName: String): Player
  allPlayers(firstName: String, lastName: String): [Player]
  game(id: String): Game
  team(id: Int): Team
}

type Player {
  id: Int
  teamId: Int
  playerGameStatistics: [PlayerGameStatistic]
  team: Team
  firstName: String
  lastName: String
  uniformNumber: Int
  class: String
  position: String
  height: Int
  weight: Int
  homeTown: String
  homeState: String
  homeCountry: String
  lastSchool: String

}

type PlayerGameStatistic {
  id: Int
  player: Player
  game: Game
  rushAttempt: Int
  rushYards: Int
  rushTd: Int
  passAtt: Int
  passComp: Int
  passYard: Int
  passTd: Int
  passInt: Int
  passConv: Int
  rec: Int
  recYards: Int
  recTd: Int
  kickoffRet: Int
  kickoffRetYards: Int
  kickoffRetTd: Int
  puntRet: Int
  puntRetYard: Int
  puntRetTd: Int
  fumRet: Int
  fumRetYard: Int
  fumRetTd: Int
  intRet: Int
  intRetYard: Int
  intRetTd: Int
  miscRet: Int
  miscRetYard: Int
  miscRetTd: Int
  fieldGoalAtt: Int
  fieldGoalMade: Int
  offXpKickAtt: Int
  offXpKickMade: Int
  off2XPAtt: Int
  off2XPMade: Int
  def2XPAtt: Int
  def2XPMade: Int
  safety: Int
  points: Int
  punt: Int
  puntYard: Int
  kickoff: Int
  kickoffYard: Int
  kickoffTouchback: Int
  kickoffOutOfBounds: Int
  kickoffOnside: Int
  fumble: Int
  fumbleLost: Int
  tackleSolo: Int
  tackleAssist: Int
  tackleForLoss: Int
  tackleForLossYard: Int
  sack: Int
  sackYard: Int
  qBHurry: Int
  fumbleForced: Int
  passBrokenUp: Int
  kickPuntBlocked: Int
}

type Game {
  id: String
  gameDate: String
  site: String
  homeTeamId: Int
  homeTeam: Team
  visitTeam: Team
  stadium: Stadium
}


type Team {
  id: Int
  name: String
  conference: Conference
}

type Conference {
  id: Int
  name: String
}

type Stadium {
  id: Int
  name: String
  city: String
  state: String
  capacity: Int
  surface: String
  yearOpened: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
