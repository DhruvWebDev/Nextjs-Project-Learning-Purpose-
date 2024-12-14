
import {Liveblocks} from "@liveblocks/node";

export const liveblocksClient = new Liveblocks({
  secret: 'sk_dev_tkIe4CjE0ZgypTMKWtB2BX6sRz4X_3_k7r-zJ174unN5gx96-ry3Dy_QWLQvNIrs' || '',
});

export function getLiveblocksClient() {
  return new Liveblocks({
    secret: process.env.NEXT_LIVEBLOCKS_SECRET_KEY || '',
  });
}