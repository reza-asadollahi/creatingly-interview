import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { AuthTokenService } from "../../auth/services/auth-token.service";

@Injectable()
export class SocketService  extends Socket {
  constructor(tokenService: AuthTokenService) {
    const userId = tokenService.token
    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {
        auth: { userId }
      }
    };
    super(config);
  }
}
