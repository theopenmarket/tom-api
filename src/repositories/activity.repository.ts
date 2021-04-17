import { getConnection, Repository } from 'typeorm';

import { Activity, UserActivity } from '@entities/activity.entity';
import { UserSession } from '@entities/user-session.entity';

const getActivityRepository = (): Repository<Activity> => getConnection().getRepository(Activity);

/**
 * Create
 */

export const createActivity = async (
  userSession: UserSession,
  type: UserActivity,
): Promise<void> => {
  const activityRecord = new Activity();
  activityRecord.user = userSession.user;
  activityRecord.type = type;
  activityRecord.ipAddress = userSession.ipAddress;

  await getActivityRepository().save(activityRecord);
};

export const createUpdateProfileActivity = (userSession: UserSession): Promise<void> =>
  createActivity(userSession, UserActivity.updateProfile);

export const createUpdateShopActivity = (userSession: UserSession): Promise<void> =>
  createActivity(userSession, UserActivity.updateShop);
