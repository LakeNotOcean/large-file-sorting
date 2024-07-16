import { fileNumberParams } from './file-numbers-params.type';
import { workingDirParam } from './working-dir-param.type';

export type fileChangeParams = workingDirParam & fileNumberParams;
