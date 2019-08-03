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
	const infoCardAnimationManager = new InfoCardAnimationManager();
	const galleryAnimationManager = new GalleryAnimationManager();

	return <Screen infoCard={infoCardAnimationManager} gallery={galleryAnimationManager} />;
};

export default memo(AnimationManager, () => true);
