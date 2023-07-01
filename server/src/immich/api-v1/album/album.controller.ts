import { AlbumResponseDto } from '@app/domain/index.js';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDParamDto } from '../../controllers/dto/uuid-param.dto.js';
import { AuthUser, AuthUserDto } from '../../decorators/auth-user.decorator.js';
import { Authenticated, SharedLinkRoute } from '../../decorators/authenticated.decorator.js';
import { UseValidation } from '../../decorators/use-validation.decorator.js';
import { AlbumService } from './album.service.js';
import { AddAssetsDto } from './dto/add-assets.dto.js';
import { RemoveAssetsDto } from './dto/remove-assets.dto.js';
import { AddAssetsResponseDto } from './response-dto/add-assets-response.dto.js';

@ApiTags('Album')
@Controller('album')
@Authenticated()
@UseValidation()
export class AlbumController {
  constructor(private service: AlbumService) {}

  @SharedLinkRoute()
  @Put(':id/assets')
  addAssetsToAlbum(
    @AuthUser() authUser: AuthUserDto,
    @Param() { id }: UUIDParamDto,
    @Body() dto: AddAssetsDto,
  ): Promise<AddAssetsResponseDto> {
    // TODO: Handle nonexistent assetIds.
    // TODO: Disallow adding assets of another user to an album.
    return this.service.addAssets(authUser, id, dto);
  }

  @SharedLinkRoute()
  @Get(':id')
  getAlbumInfo(@AuthUser() authUser: AuthUserDto, @Param() { id }: UUIDParamDto) {
    return this.service.get(authUser, id);
  }

  @Delete(':id/assets')
  removeAssetFromAlbum(
    @AuthUser() authUser: AuthUserDto,
    @Body() dto: RemoveAssetsDto,
    @Param() { id }: UUIDParamDto,
  ): Promise<AlbumResponseDto> {
    return this.service.removeAssets(authUser, id, dto);
  }
}
