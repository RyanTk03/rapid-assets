import { RefObject, useEffect } from "react";

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    elementRef: RefObject<T>,
    handler: (event?: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const outsideClickHandler = (event: MouseEvent | TouchEvent) => {
            if (elementRef && !elementRef.current?.contains(event?.target as Node)) {
                handler(event)
            }
        }

        document.addEventListener('mousedown', outsideClickHandler);
        document.addEventListener('touchstart', outsideClickHandler);

        return () => {
            document.removeEventListener('click', outsideClickHandler);
            document.removeEventListener('touchstart', outsideClickHandler);
        }
    }, [elementRef, handler])
}

export default useOnClickOutside;