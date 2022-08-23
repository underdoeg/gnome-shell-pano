import { Actor } from '@gi-types/clutter10';
import { Global } from '@gi-types/shell0';
import { getCurrentExtensionSettings, logger } from '@pano/utils/shell';

const debug = logger('shell');
const global = Global.get();

export const notify = (text: string): void => {
  const settings = getCurrentExtensionSettings();
  const showNotifications = settings.get_boolean('show-notifications');
  if (showNotifications) {
    imports.ui.main.notify(text);
  } else {
    debug(`Notifications are disabled. Logging the content instead. Content: ${text}`);
  }
};

export const wm = imports.ui.main.wm;

export const getMonitors = (): Monitor[] => imports.ui.main.layoutManager.monitors;

export const getMonitorIndexForPointer = () => {
  const [x, y] = global.get_pointer();
  const monitors = getMonitors();

  for (let i = 0; i <= monitors.length; i++) {
    const monitor = monitors[i];

    if (x >= monitor.x && x < monitor.x + monitor.width && y >= monitor.y && y < monitor.y + monitor.height) {
      return i;
    }
  }

  return imports.ui.main.layoutManager.primaryIndex;
};

export const getMonitorConstraint = () =>
  new imports.ui.layout.MonitorConstraint({
    index: getMonitorIndexForPointer(),
  });

export const getMonitorConstraintForIndex = (index: number) =>
  new imports.ui.layout.MonitorConstraint({
    index,
  });

export const addChrome = (actor: Actor, options?: any) => imports.ui.main.layoutManager.addChrome(actor, options);
export const removeChrome = (actor: Actor) => imports.ui.main.layoutManager.removeChrome(actor);