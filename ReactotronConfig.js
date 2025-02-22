import Reactotron, {
  networking,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SHOW_ASYNC_STORAGE_COMMAND = 'show_async_storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(networking())
  .use(openInEditor())
  .use(trackGlobalErrors())
  .connect(); // let's connect!
