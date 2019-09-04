import { match } from 'react-router';
import { Location, History } from 'history';

export interface IWithRouter {
  match: match;
  history: History;
  location: Location;
}
