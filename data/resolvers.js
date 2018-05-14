import { Player, Game, PlayerGameStatistic, Team } from './connectors';

const resolvers = {
  Query: {
    player(_, args) {
      return Player.find({ where: args });
    },
    allPlayers(_, args) {
      return Player.findAll({ where: args });
    },
    game(_, args) {
      return Game.find({ where: args })
    },
    team(_, args) {
      return Team.find({ where: args })
    }
  },
  Team: {
    conference(team) {
      return team.getConference();
    }
  },
  Game: {
    homeTeam(game) {
      return game.getHomeTeam();
    },
    visitTeam(game) {
      return game.getVisitTeam();
    },
    stadium(game) {
      return game.getStadium();
    }
  },
  Player: {
    playerGameStatistics(player) {
      return player.getPlayerGameStatistics();
    },
    team(player) {
      return player.getTeam()
    }
  },
  PlayerGameStatistic: {
    player(playerGameStatistic) {
      return playerGameStatistic.getPlayer();
    },
    game(playerGameStatistic) {
      return playerGameStatistic.getGame();
    }
  }
};

export default resolvers; 