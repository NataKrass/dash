import { useTranslation } from 'react-i18next';

export default function TranslationSample () {
  const { t } = useTranslation('header');

  return (
    <h1>{t('main')}</h1>
  );
}
