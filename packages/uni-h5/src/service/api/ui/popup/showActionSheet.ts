import {
  API_TYPE_SHOW_ACTION_SHEET,
  API_SHOW_ACTION_SHEET,
  ShowActionSheetProtocol,
  ShowActionSheetOptions,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import actionSheet from './actionSheet'

export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  (args, { resolve, reject }) => {
    resolve()
  },
  ShowActionSheetProtocol,
  ShowActionSheetOptions
)
