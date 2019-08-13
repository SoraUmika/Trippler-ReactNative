/**
 * Animation manager for the business screen.
 */
import React, { FC, memo } from "react";

import Screen from "./Screen";
import InfoCardAnimationManager from "./animationManager/infoCard";
import GalleryAnimationManager from "./animationManager/gallery";

/**
 * This component if for managing animation.
 * The actual presentational component is down below.
 */
const AnimationManager: FC = () => {
	return <Screen />;
};

export default memo(AnimationManager, () => true);
