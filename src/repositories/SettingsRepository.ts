import { Repository } from 'typeorm';
import { Setting } from '../entities/Setting';

class SettingsRepository extends Repository <Setting> {}

export { SettingsRepository };