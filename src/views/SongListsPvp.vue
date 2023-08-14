<template>
    <div>
        <div v-if="SongListsPvpAll" class="songlistspvp">
            <!-- 排行榜顶部返回按钮+导航栏 -->
            <div class="songlistspvp-header">
                <div class="header-title">
                    <div class="header-title-left">
                        <router-link tag="span" to="/home" class="iconfont icon-arrow-left-bold"></router-link>
                        <span>排行榜</span>
                    </div>
                    <div class="header-title-right">
                        <span>定制首页榜单</span>
                    </div>
                </div>
                <div class="header-title-nav">
                    <ul>
                        <li @click="SongListsPvpTabbtn(index)" v-for="(item,index) in SongListsPvpTab" :key="index" :class="[{'active':index==active}]">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div v-show="active==0">
                <!-- 排行榜官方榜 -->
                <div class="songlistspvp-official">
                    <div class="official-title">
                        <img src="../assets/images/logo.png" alt="">
                        <span>官方榜</span>
                    </div>
                    <div class="official-item">
                        <!-- 飙升榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpSpeedUp.id" class="official-item-list">
                            <div class="item-list-title">
                                <div>{{SongListsPvpSpeedUp.name}}</div>
                                <div class="up-new">{{SongListsPvpSpeedUp.updateFrequency}}</div>
                            </div>
                            <div class="item-list-pict">
                                <div class="item-list-pict-left">
                                    <!-- <span class="iconfont icon-bofang"></span> -->
                                    <img class="auto-img" :src="SongListsPvpSpeedUp.coverImgUrl+'?parms=65y65'" alt="">
                                </div>
                                <div class="item-list-pict-right">
                                    <p v-for="(item,index) in SongListsPvpSpeedUp.tracks" :key="index" class="one-txt-cut"><span>{{index+1}} {{item.first}}</span> - {{item.second}}</p>
                                    <!-- <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p>
                                    <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p> -->
                                </div>
                            </div>
                        </router-link>
                        <!-- 新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpNew.id" class="official-item-list">
                            <div class="item-list-title">
                                <div>{{SongListsPvpNew.name}}</div>
                                <div class="up-new">{{SongListsPvpNew.updateFrequency}}</div>
                            </div>
                            <div class="item-list-pict">
                                <div class="item-list-pict-left">
                                    <!-- <span class="iconfont icon-bofang"></span> -->
                                    <img class="auto-img" :src="SongListsPvpNew.coverImgUrl+'?parms=65y65'" alt="">
                                </div>
                                <div class="item-list-pict-right">
                                    <p v-for="(item,index) in SongListsPvpNew.tracks" :key="index" class="one-txt-cut"><span>{{index+1}} {{item.first}}</span> - {{item.second}}</p>
                                    <!-- <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p>
                                    <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p> -->
                                </div>
                            </div>
                        </router-link>
                        <!-- 原创榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpMine.id" class="official-item-list">
                            <div class="item-list-title">
                                <div>{{SongListsPvpMine.name}}</div>
                                <div class="up-new">{{SongListsPvpMine.updateFrequency}}</div>
                            </div>
                            <div class="item-list-pict">
                                <div class="item-list-pict-left">
                                    <!-- <span class="iconfont icon-bofang"></span> -->
                                    <img class="auto-img" :src="SongListsPvpMine.coverImgUrl+'?parms=65y65'" alt="">
                                </div>
                                <div class="item-list-pict-right">
                                    <p v-for="(item,index) in SongListsPvpMine.tracks" :key="index" class="one-txt-cut"><span>{{index+1}} {{item.first}}</span> - {{item.second}}</p>
                                    <!-- <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p>
                                    <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p> -->
                                </div>
                            </div>
                        </router-link>
                        <!-- 热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpHot.id" class="official-item-list">
                            <div class="item-list-title">
                                <div>{{SongListsPvpHot.name}}</div>
                                <div class="up-new">{{SongListsPvpHot.updateFrequency}}</div>
                            </div>
                            <div class="item-list-pict">
                                <div class="item-list-pict-left">
                                    <!-- <span class="iconfont icon-bofang"></span> -->
                                    <img class="auto-img" :src="SongListsPvpHot.coverImgUrl+'?parms=65y65'" alt="">
                                </div>
                                <div class="item-list-pict-right">
                                    <p v-for="(item,index) in SongListsPvpHot.tracks" :key="index" class="one-txt-cut"><span>{{index+1}} {{item.first}}</span> - {{item.second}}</p>
                                    <!-- <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p>
                                    <p class="one-txt-cut"><span>1 开往早晨的午夜</span> - 张碧晨</p> -->
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 排行榜---精选榜 -->
                <div class="songlistspvp-selected">
                    <div class="songlistspvp-selected-title">
                        <span>精选榜</span>
                    </div>
                    <div class="songlistspvp-selected-item">
                        <!-- 说唱榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRap.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRap.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRap.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP爱听榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVip.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVip.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVip.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipNew.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipNew.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipNew.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipHot.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP热搜榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipSearch.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipSearch.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipSearch.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG动画榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgAnimation.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgAnimation.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgAnimation.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG游戏榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgGame.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgGame.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgGame.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACGVOCALOID榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgVOCALOID.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgVOCALOID.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgVOCALOID.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 网络热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpNetworkHot.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpNetworkHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpNetworkHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- BEAT榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBEAT.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBEAT.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBEAT.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 赏音榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAdmire.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAdmire.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAdmire.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 排行榜---曲风榜 -->
                <div class="songlistspvp-genre">
                    <div class="songlistspvp-genre-title">
                        <span>曲风榜</span>
                    </div>
                    <div class="songlistspvp-genre-item">    
                        <!-- 古典榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOld.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOld.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpOld.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 电音榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpElectricity.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpElectricity.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpElectricity.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcg.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcg.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpAcg.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 国电榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChina.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChina.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChina.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 摇滚榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRock.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRock.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpRock.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 国风榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChinaFeng.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChinaFeng.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChinaFeng.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 民谣榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBallad.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBallad.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpBallad.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 中文DJ榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChinaDJ.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChinaDJ.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChinaDJ.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 排行榜---全球榜 -->
                <div class="songlistspvp-Global">
                    <div class="songlistspvp-Global-title">
                        <span>全球榜</span>
                    </div>
                    <div class="songlistspvp-Global-item">
                        <!-- 英国UK榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpUK.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpUK.name}}</span>
                                <img class="auto-img" :src="SongListsPvpUK.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpUK.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 法国榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpFrance.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpFrance.name}}</span>
                                <img class="auto-img" :src="SongListsPvpFrance.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpFrance.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 美国榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAmerica.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpAmerica.name}}</span>
                                <img class="auto-img" :src="SongListsPvpAmerica.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAmerica.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 日本Oricon榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpJan.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpJan.name}}</span>
                                <img class="auto-img" :src="SongListsPvpJan.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpJan.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 全球舞曲榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpWord.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpWord.name}}</span>
                                <img class="auto-img" :src="SongListsPvpWord.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpWord.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 俄罗斯TopHit榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRussiaTopHit.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpRussiaTopHit.name}}</span>
                                <img class="auto-img" :src="SongListsPvpRussiaTopHit.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRussiaTopHit.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 排行榜---语种榜 -->
                <div class="songlistspvp-languages">
                    <div class="songlistspvp-languages-title">
                        <span>语种榜</span>
                    </div>
                    <div class="songlistspvp-languages-item">    
                        <!-- 韩语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpKorea.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpKorea.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpKorea.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOccidentalHot.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOccidentalHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpOccidentalHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOccidentalNew.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOccidentalNew.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpOccidentalNew.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpJanLanguages.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpJanLanguages.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpJanLanguages.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 俄语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRussia.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRussia.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRussia.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 越南语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpVietnamese.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpVietnamese.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpVietnamese.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 泰语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpThailand.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpThailand.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpThailand.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 排行榜---特色榜 -->
                <div class="songlistspvp-unique">
                    <div class="songlistspvp-unique-title">
                        <span>特色榜</span>
                    </div>
                    <div class="songlistspvp-unique-item">    
                        <!-- KTV榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpKTV.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpKTV.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpKTV.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 潜力爆款榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpPotential.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpPotential.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpPotential.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 听歌识曲榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpListenMusic.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpListenMusic.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpListenMusic.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- LOOK直播榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpLOOKLive.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpLOOKLive.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpLOOKLive.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- 排行榜---精选榜 -->
            <transition>
                <div v-show="active==1" class="songlistspvp-selected">
                    <div class="songlistspvp-selected-title">
                        <span>精选榜</span>
                    </div>
                    <div class="songlistspvp-selected-item">
                        <!-- 说唱榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRap.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRap.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRap.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP爱听榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVip.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVip.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVip.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipNew.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipNew.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipNew.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipHot.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 黑胶VIP热搜榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBlickVipSearch.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBlickVipSearch.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBlickVipSearch.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG动画榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgAnimation.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgAnimation.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgAnimation.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG游戏榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgGame.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgGame.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgGame.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACGVOCALOID榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcgVOCALOID.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcgVOCALOID.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAcgVOCALOID.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 网络热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpNetworkHot.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpNetworkHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpNetworkHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- BEAT榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBEAT.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBEAT.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpBEAT.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 赏音榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAdmire.id" class="selected-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAdmire.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAdmire.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>
            <!-- 排行榜---曲风榜 -->
            <transition>
                <div v-show="active==2" class="songlistspvp-genre">
                    <div class="songlistspvp-genre-title">
                        <span>曲风榜</span>
                    </div>
                    <div class="songlistspvp-genre-item">    
                        <!-- 古典榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOld.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOld.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpOld.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 电音榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpElectricity.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpElectricity.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpElectricity.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- ACG榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAcg.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpAcg.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpAcg.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 国电榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChina.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChina.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChina.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 摇滚榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRock.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRock.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpRock.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 国风榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChinaFeng.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChinaFeng.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChinaFeng.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 民谣榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpBallad.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpBallad.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpBallad.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 中文DJ榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpChinaDJ.id" class="genre-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpChinaDJ.coverImgUrl+'?parms=y105=105'" alt="">
                                <span>{{SongListsPvpChinaDJ.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>
            <!-- 排行榜---全球榜 -->
            <transition>
                <div v-show="active==3" class="songlistspvp-Global">
                    <div class="songlistspvp-Global-title">
                        <span>全球榜</span>
                    </div>
                    <div class="songlistspvp-Global-item">
                        <!-- 英国UK榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpUK.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpUK.name}}</span>
                                <img class="auto-img" :src="SongListsPvpUK.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpUK.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 法国榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpFrance.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpFrance.name}}</span>
                                <img class="auto-img" :src="SongListsPvpFrance.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpFrance.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 美国榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpAmerica.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpAmerica.name}}</span>
                                <img class="auto-img" :src="SongListsPvpAmerica.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpAmerica.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 日本Oricon榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpJan.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpJan.name}}</span>
                                <img class="auto-img" :src="SongListsPvpJan.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpJan.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 全球舞曲榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpWord.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpWord.name}}</span>
                                <img class="auto-img" :src="SongListsPvpWord.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpWord.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 俄罗斯TopHit榜 --> 
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRussiaTopHit.id" class="Global-item-list">
                            <div class="item-list-pict">
                                <span  class="one-txt-cut item-list-pict-title">{{SongListsPvpRussiaTopHit.name}}</span>
                                <img class="auto-img" :src="SongListsPvpRussiaTopHit.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRussiaTopHit.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>
            <!-- 排行榜---语种榜 -->
            <transition>
                <div v-show="active==4" class="songlistspvp-languages">
                    <div class="songlistspvp-languages-title">
                        <span>语种榜</span>
                    </div>
                    <div class="songlistspvp-languages-item">    
                        <!-- 韩语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpKorea.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpKorea.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpKorea.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美热歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOccidentalHot.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOccidentalHot.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpOccidentalHot.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpOccidentalNew.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpOccidentalNew.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpOccidentalNew.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 欧美新歌榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpJanLanguages.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpJanLanguages.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpJanLanguages.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 俄语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpRussia.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpRussia.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpRussia.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 越南语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpVietnamese.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpVietnamese.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpVietnamese.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 泰语榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpThailand.id" class="languages-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpThailand.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpThailand.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>
            <!-- 排行榜---特色榜 -->
            <transition>
                <div v-show="active==5" class="songlistspvp-unique">
                    <div class="songlistspvp-unique-title">
                        <span>特色榜</span>
                    </div>
                    <div class="songlistspvp-unique-item">    
                        <!-- KTV榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpKTV.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpKTV.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpKTV.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 潜力爆款榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpPotential.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpPotential.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpPotential.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- 听歌识曲榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpListenMusic.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpListenMusic.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpListenMusic.updateFrequency}}</span>
                            </div>
                        </router-link>
                        <!-- LOOK直播榜 -->
                        <router-link tag="div" :to="'/songList?id='+SongListsPvpLOOKLive.id" class="unique-item-list">
                            <div class="item-list-pict">
                                <img class="auto-img" :src="SongListsPvpLOOKLive.coverImgUrl+'?parms=105y105'" alt="">
                                <span>{{SongListsPvpLOOKLive.updateFrequency}}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition>
            <!-- 大背景色 -->
            <div class="songlistspvp-bigbg"></div>
        </div>
    </div>
</template>

<script>
import { getSongListsPvpToplist } from "../api/SongListsPvp";
export default {
    data() {
        return {
            active:0,
            SongListsPvpTab:[
                "官方",
                "精选",
                "曲风",
                "全球",
                "语种",
                "特色",
            ],
            SongListsPvpAll:[],              //排行榜总榜
            SongListsPvpSpeedUp:[],          //排行榜---飙升榜
            SongListsPvpNew:[],              //排行榜---新歌榜
            SongListsPvpMine:[],             //排行榜---原创榜
            SongListsPvpHot:[],              //排行榜---热歌榜
            SongListsPvpRap:[],              //排行榜---说唱榜
            SongListsPvpOld:[],              //排行榜---古典榜
            SongListsPvpElectricity:[],      //排行榜---电音榜
            SongListsPvpBlickVip:[],         //排行榜---黑胶VIP爱听榜
            SongListsPvpAcg:[],              //排行榜---ACG榜
            SongListsPvpKorea:[],            //排行榜---韩语榜
            SongListsPvpChina:[],            //排行榜---国电榜
            SongListsPvpUK:[],               //排行榜---英国UK榜
            SongListsPvpAmerica:[],          //排行榜---美国榜
            SongListsPvpWord:[],             //排行榜---全球舞曲榜
            SongListsPvpKTV:[],              //排行榜---KTV榜
            SongListsPvpJan:[],              //排行榜---日本Oricon榜
            SongListsPvpOccidentalHot:[],    //排行榜---欧美热歌榜
            SongListsPvpOccidentalNew:[],    //排行榜---欧美新歌榜
            SongListsPvpFrance:[],           //排行榜---法国榜
            SongListsPvpAcgAnimation:[],     //排行榜---ACG动画榜
            SongListsPvpAcgGame:[],          //排行榜---ACG游戏榜
            SongListsPvpAcgVOCALOID:[],      //排行榜---ACGVOCALOID榜
            SongListsPvpJanLanguages:[],     //排行榜---日语榜
            SongListsPvpRock:[],             //排行榜---摇滚榜
            SongListsPvpChinaFeng:[],        //排行榜---国风榜
            SongListsPvpPotential:[],        //排行榜---潜力爆款榜
            SongListsPvpBallad:[],           //排行榜---民谣榜
            SongListsPvpListenMusic:[],      //排行榜---听歌识曲榜
            SongListsPvpNetworkHot:[],       //排行榜---网络热歌榜
            SongListsPvpRussia:[],           //排行榜---俄语榜
            SongListsPvpVietnamese:[],       //排行榜---越南语榜
            SongListsPvpChinaDJ:[],          //排行榜---中文DJ榜
            SongListsPvpRussiaTopHit:[],     //排行榜---俄罗斯TopHit榜
            SongListsPvpThailand:[],         //排行榜---泰语榜
            SongListsPvpBEAT:[],             //排行榜---BEAT榜
            SongListsPvpLOOKLive:[],         //排行榜---LOOK直播榜
            SongListsPvpAdmire:[],           //排行榜---赏音榜
            SongListsPvpBlickVipNew:[],      //排行榜---黑胶VIP新歌榜
            SongListsPvpBlickVipHot:[],      //排行榜---黑胶VIP热歌榜
            SongListsPvpBlickVipSearch:[],   //排行榜---黑胶VIP热搜榜
            
        }
    },
    methods:{
        getPVP(){
            // 获取排行榜数据
            getSongListsPvpToplist().then(data=>{
                console.log(data);
                // 获取排行榜总榜
                this.SongListsPvpAll = data.list
                // 获取排行榜---飙升榜
                this.SongListsPvpSpeedUp = this.SongListsPvpAll[0]
                // 获取排行榜---新歌榜
                this.SongListsPvpNew = this.SongListsPvpAll[1]
                // 获取排行榜---原创榜
                this.SongListsPvpMine = this.SongListsPvpAll[2]
                // 获取排行榜---热歌榜
                this.SongListsPvpHot = this.SongListsPvpAll[3]
                // 获取排行榜---说唱榜
                this.SongListsPvpRap = this.SongListsPvpAll[4]
                // 获取排行榜---古典榜
                this.SongListsPvpOld = this.SongListsPvpAll[5]
                // 获取排行榜---电音榜
                this.SongListsPvpElectricity = this.SongListsPvpAll[6]
                // 获取排行榜---电音榜
                this.SongListsPvpBlickVip = this.SongListsPvpAll[7]
                // 获取排行榜---ACG榜
                this.SongListsPvpAcg = this.SongListsPvpAll[8]
                // 获取排行榜---韩语榜
                this.SongListsPvpKorea = this.SongListsPvpAll[9]
                // 获取排行榜---国电榜
                this.SongListsPvpChina = this.SongListsPvpAll[10]
                // 获取排行榜---英国UK榜
                this.SongListsPvpUK = this.SongListsPvpAll[11]
                // 获取排行榜---美国榜
                this.SongListsPvpAmerica = this.SongListsPvpAll[12]
                // 获取排行榜---全球舞曲榜
                this.SongListsPvpWord = this.SongListsPvpAll[13]
                // 获取排行榜---KTV榜
                this.SongListsPvpKTV = this.SongListsPvpAll[14]
                // 获取排行榜---日本Oricon榜
                this.SongListsPvpJan = this.SongListsPvpAll[15]
                // 获取排行榜---欧美热歌榜
                this.SongListsPvpOccidentalHot = this.SongListsPvpAll[16]
                // 获取排行榜---欧美新歌榜
                this.SongListsPvpOccidentalNew = this.SongListsPvpAll[17]
                // 获取排行榜---法国榜
                this.SongListsPvpFrance = this.SongListsPvpAll[18]
                // 获取排行榜---ACG动画榜
                this.SongListsPvpAcgAnimation = this.SongListsPvpAll[19]
                // 获取排行榜---ACG游戏榜
                this.SongListsPvpAcgGame = this.SongListsPvpAll[20]
                // 获取排行榜---ACGVOCALOID榜榜
                this.SongListsPvpAcgVOCALOID = this.SongListsPvpAll[21]
                // 获取排行榜---日语榜
                this.SongListsPvpJanLanguages = this.SongListsPvpAll[22]
                // 获取排行榜---摇滚榜
                this.SongListsPvpRock = this.SongListsPvpAll[23]
                // 获取排行榜---国风榜
                this.SongListsPvpChinaFeng = this.SongListsPvpAll[24]
                // 获取排行榜---潜力爆款榜
                this.SongListsPvpPotential = this.SongListsPvpAll[25]
                // 获取排行榜---民谣榜
                this.SongListsPvpBallad = this.SongListsPvpAll[26]
                // 获取排行榜---听歌识曲榜
                this.SongListsPvpListenMusic = this.SongListsPvpAll[27]
                // 获取排行榜---网络热歌榜
                this.SongListsPvpNetworkHot = this.SongListsPvpAll[28]
                // 获取排行榜---俄语榜
                this.SongListsPvpRussia = this.SongListsPvpAll[29]
                // 获取排行榜---越南语榜
                this.SongListsPvpVietnamese = this.SongListsPvpAll[30]
                // 获取排行榜---中文DJ榜
                this.SongListsPvpChinaDJ = this.SongListsPvpAll[31]
                // 获取排行榜---俄罗斯TopHit榜
                this.SongListsPvpRussiaTopHit = this.SongListsPvpAll[32]
                // 获取排行榜---泰语榜
                this.SongListsPvpThailand = this.SongListsPvpAll[33]
                // 获取排行榜---BEAT榜
                this.SongListsPvpBEAT = this.SongListsPvpAll[34]
                // 获取排行榜---LOOK榜
                this.SongListsPvpLOOKLive = this.SongListsPvpAll[36]
                // 获取排行榜---赏音榜
                this.SongListsPvpAdmire = this.SongListsPvpAll[37]
                // 获取排行榜---黑胶VIP新歌榜
                this.SongListsPvpBlickVipNew = this.SongListsPvpAll[38]
                // 获取排行榜---黑胶VIP新歌榜
                this.SongListsPvpBlickVipHot = this.SongListsPvpAll[39]
                // 获取排行榜---黑胶VIP热搜榜
                this.SongListsPvpBlickVipSearch = this.SongListsPvpAll[40]
            })
        },
        // 排行榜导航栏点击切换
        SongListsPvpTabbtn(index){
            this.active = index
        },
    },
    created(){
        this.getPVP()
    }
}
</script>

<style lang="scss"  >

.songlistspvp{
    position: relative;
    width: 100%;
    background: #eaeff9;
    padding-top: 110px;
    // 排行榜顶部返回按钮+导航栏
    .songlistspvp-header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        width: 100%;
        background: #eaeff9;
        padding-left: 16px;
        padding-top: 10px;
        .header-title { 
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 44px;
            padding-right: 16px;
            background: #eaeff9;
            .header-title-left {
                font-weight: 700;
                .iconfont {
                    margin-right: 12px;
                }
            }
            .header-title-right {
                padding: 6px 8px;
                border: 1px solid #d3d8e0;
                border-radius: 20px;
                color: #333;
            }
        }
        .header-title-nav {
            width: 100%;
            height: 50px;
            background: #eaeff9;
            ul {
                display: flex;
                align-items: center;
                width: 100%;
                height: 45px;
                li {
                    position: relative;
                    color: #7b818f;
                    margin-right: 30px;
                    &:last-child {
                        margin-right: 0px;
                    }
                    &.active {
                        color: #000;
                        font-weight: bold;
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: -7px;
                            display: block;
                            width: 100%;
                            height: 6px;
                            border-radius: 20px;
                            background: #ff3a3a;
                        }
                    }
                }
            }
        }
    }
    // 排行榜---官方榜
    .songlistspvp-official {
        width: 100%;
        margin-bottom: 50px;
        // margin-top: 100px;
        // padding-top: 10px;
        .official-title {
            display: flex;
            align-items: center;
            padding-left: 16px;
            font-size: 18px;
            margin-bottom: 17px;
            img {
                width: 20px;
                height: 20px;
                display: inline-block;
                border-radius: 50%;
                margin-right: 6px;
            }
        }
        .official-item {
            width: 100%;
            padding: 0 16px;
            .official-item-list {
                width: 100%;
                height: 130px;
                padding: 17px;
                border-radius: 10px;
                background: #fff;
                border: 1px solid #e7e9ee;
                margin-bottom: 15px;
                .item-list-title{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 22px;
                    margin-bottom: 15px;
                    .up-new {
                        font-size: 12px;
                    }
                }
                .item-list-pict {
                    display: flex;
                    .item-list-pict-left {
                        position: relative;
                        width: 65px;
                        height: 65px;
                        border-radius: 10px;
                        margin-right: 30px;
                        overflow: hidden;
                        span{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            color: #b3b3b4;
                        }
                    }
                    .item-list-pict-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 14px;
                        p {
                            max-width: 210px;
                            span{
                                font-weight:600;
                            }
                        }
                    }
                }
            }
        }
    }
    // 排行榜---精选榜
    .songlistspvp-selected {
        width: 100%;
        margin-bottom: 50px;
        .songlistspvp-selected-title {
            width: 100%;
            padding-left: 16px;
            margin-bottom: 10px;
            span{
                font-weight: bold;
            }
        }
        .songlistspvp-selected-item {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 16px;
            .selected-item-list {
                margin-right: 13px;
                margin-bottom: 10px;
                .item-list-pict {
                    position: relative;
                    width: 105px;
                    height: 105px;
                    border-radius: 10px;
                    overflow: hidden;
                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        color: #ccc;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    // 排行榜---曲风榜
    .songlistspvp-genre {
        width: 100%;
        margin-bottom: 50px;
        .songlistspvp-genre-title {
            width: 100%;
            padding-left: 16px;
            margin-bottom: 10px;
        }
        .songlistspvp-genre-item {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 16px;
            .genre-item-list {
                margin-right: 13px;
                margin-bottom: 10px;
                .item-list-pict {
                    position: relative;
                    width: 105px;
                    height: 105px;
                    border-radius: 10px;
                    overflow: hidden;
                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        color: #ccc;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    // 排行榜---全球榜
    .songlistspvp-Global {
        width: 100%;
        margin-bottom: 50px;
        .songlistspvp-Global-title {
            width: 100%;
            padding-left: 16px;
            margin-bottom: 10px;
        }
        .songlistspvp-Global-item {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 16px;
            .Global-item-list {
                margin-right: 13px;
                margin-bottom: 10px;
                .item-list-pict {
                    position: relative;
                    width: 105px;
                    height: 105px;
                    border-radius: 10px;
                    overflow: hidden;
                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        color: #ccc;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                    .item-list-pict-title {
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 3px;
                        transform: translateX(-50%);
                        width: 100%;
                        padding: 0 3px;
                        max-width: 105px;
                        color: #fff;
                        font-size: 14px;
                        font-weight: 700;
                        text-align: center;
                    }
                }
            }
        }
    }
    // 排行榜---语种榜
    .songlistspvp-languages {
        width: 100%;
        margin-bottom: 50px;
        .songlistspvp-languages-title {
            width: 100%;
            padding-left: 16px;
            margin-bottom: 10px;
        }
        .songlistspvp-languages-item {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 16px;
            .languages-item-list {
                margin-right: 13px;
                margin-bottom: 10px;
                .item-list-pict {
                    position: relative;
                    width: 105px;
                    height: 105px;
                    border-radius: 10px;
                    overflow: hidden;
                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        color: #ccc;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    // 排行榜---特色榜
    .songlistspvp-unique {
        width: 100%;
        margin-bottom: 50px;
        .songlistspvp-unique-title {
            width: 100%;
            padding-left: 16px;
            margin-bottom: 10px;
        }
        .songlistspvp-unique-item {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding-left: 16px;
            .unique-item-list {
                margin-right: 13px;
                margin-bottom: 10px;
                .item-list-pict {
                    position: relative;
                    width: 105px;
                    height: 105px;
                    border-radius: 10px;
                    overflow: hidden;
                    span {
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        color: #ccc;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                }
            }
        }
    }
    .songlistspvp-bigbg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -3;
        width: 100%;
        height: 100vh;
        background: #eaeff9;
    }
}
.v-leave-to {
    opacity: 0.5;
    transform: translateY(-100%);
}

.v-enter {
    opacity: 0.5;
    transform: translateY(100%);
}

.v-leave-active,.v-enter-active {
    transition: all 0.2s linear;
}
</style>