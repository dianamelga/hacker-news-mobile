import { FIRST_LAUNCH } from '@/constants/async-storage-keys';
import { loadLocalData, saveLocalData } from '@/utils/storage';
import { useCallback, useEffect, useState } from 'react';

export const useAppBoot = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const hideModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  useEffect(() => {
    const load = async () => {
      const isFirstLaunch =
        (await loadLocalData<boolean>(FIRST_LAUNCH)) ?? true;
      setModalIsVisible(isFirstLaunch);

      if (isFirstLaunch) {
        saveLocalData<boolean>(FIRST_LAUNCH, false);
      }
    };
    load();
  }, []);

  return { modalIsVisible, hideModal };
};
