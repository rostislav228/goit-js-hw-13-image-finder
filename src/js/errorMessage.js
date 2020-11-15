import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function errorMessage (message, ms) {
    error({
        text: `${message}`,
        delay: ms,
        closerHover: true,
    });
}