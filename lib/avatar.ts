import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function getAvatar(email: string) {
  const avatar = createAvatar(botttsNeutral, {
    seed: email,
  });
  return avatar.toDataUriSync();
}
