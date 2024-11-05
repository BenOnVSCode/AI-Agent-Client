import { combineSlices } from '@reduxjs/toolkit';
import filter from './slices';
import { authApi } from './services/auth';
import { callsApi } from './services/calls';
import { statusesApi } from './services/statuses';
import { usersApi } from './services/users';


const rootReducer = combineSlices(filter, authApi, callsApi, statusesApi, usersApi)

export default rootReducer;