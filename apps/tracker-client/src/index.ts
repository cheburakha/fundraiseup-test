import { TrackerClient } from './tracker-client';
import * as config from '../../../config.json';

window['tracker'] = new TrackerClient(config.TRACKER_PATH);
