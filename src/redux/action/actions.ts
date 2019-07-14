import {createStandardAction} from "typesafe-actions"

export const setAccentColor = createStandardAction("theme/accentColor/SET")<string>();
