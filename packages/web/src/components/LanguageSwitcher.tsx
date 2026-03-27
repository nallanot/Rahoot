import { useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm">
        {t("language.label")}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value as "fr" | "en")}
        className="rounded border px-2 py-1"
      >
        <option value="fr">{t("language.fr")}</option>
        <option value="en">{t("language.en")}</option>
      </select>
    </div>
  );
}