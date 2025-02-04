<template>
    <ion-page>
        <Header />
        <ion-content ref="content">
            <div id="grid">
                <ion-grid
                    style=" overflow-y: scroll !important; display: flex; flex-direction: column; justify-content: center; ">
                    <ion-row
                        style="position: fixed; top: 40px; z-index: 999; width: 100%; margin-bottom: 20px; height: 50px; background-color: #F5F5F5;">
                        <ion-col size="12">
                            <ion-row>
                                <img @click="goBack()"
                                    style="height: 20px; margin-left: 0px; width: 15px; margin-top: 13px; object-fit: contain;"
                                    src="../../../assets/back.png" alt="">

                                <ion-col size="6" style="display:flex; flex-direction: row; ">


                                    <img v-if="userInfo.latest_offer?.from?.length > 0 && userInfo.latest_offer?.to[userInfo.latest_offer.from.length - 1]?.image"
                                        style="height: 35px; object-fit: contain;" alt="Product Image"
                                        :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${userInfo.latest_offer?.to[userInfo.latest_offer.from.length - 1]?.image}`" />

                                    <img v-else-if="userInfo.latest_offer?.to?.length > 0 && userInfo.latest_offer?.to[userInfo.latest_offer.to.length - 1]?.image"
                                        style="height: 35px; object-fit: contain;" alt="Product Image"
                                        :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${userInfo.latest_offer?.to[userInfo.latest_offer.to.length - 1]?.image}`" />


                                    <img v-else style="height: 35px; object-fit: contain;" alt="Product Image"
                                        :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${userInfo.latest_offer?.showcase_image}`" />

                                    <ion-col style="display:flex;flex-direction:column;"
                                        v-if="userInfo._from !== userCode">
                                        <p @click="goProfile(userInfo._from !== userCode ? userInfo._from : userInfo._to)"
                                            style="margin-top:-15px; font-size: 20px;  font-weight: bold; margin-left: 10px" />
                                        <p style="margin-top: 0px; margin-left: 10px;">
                                            {{ userInfo.latest_offer.meName ? userInfo.latest_offer.meName :
                                                userInfo.latest_offer.meOwnerInfo.name }}
                                        </p>


                                    </ion-col>
                                    <ion-col style="display:flex;flex-direction:column;" v-else>

                                        <p @click="goProfiles(userInfo._from == userCode ? userInfo.latest_offer.targetOwnerInfo.user_code : userInfo.latest_offer.targetOwnerInfo.user_code)"
                                            style="margin-top:5px; font-size: 13px; width: 100px;  font-weight: bold; margin-left: 10px">
                                            {{ userInfo.latest_offer.targetOwnerInfo.name }}
                                        </p>
                                    </ion-col>

                                </ion-col>
                                <ion-col size="7"
                                    style="display:flex; justify-content: space-between; align-items: center; ">
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>


                    <ion-row style="margin-bottom: 20px" class="ion-justify-content-center">
                        <ion-col size="2">Bugün</ion-col>
                    </ion-row>


                    <ion-row class="ion-justify-content-center" style="margin-bottom: 30px; ">
                        <ion-col size="12" style="background-color:   ">
                            <ion-row
                                style="margin-bottom: 40px; display: flex; border-radius: 1vh;    justify-content: flex-end;"
                                v-for="(message, messageIndex) in chatMessageList" :key="messageIndex">


                                <template
                                    v-if="message.offer_detail.from.length > 0 && message.offer_detail.to.length > 0">

                                    <!-- 'from' verilerini gösteren column -->
                                    <ion-col style="background-color: #E5E5E5; border-top-left-radius: 20px;  "
                                        v-if="message.offer_detail.from.length > 0" size="5">
                                        <div style="position: relative;">
                                            <!-- Yuvarlak sayı -->
                                            <p
                                                style="position: absolute; z-index: 2;  top: -15px; left: 25px; color: black; ; font-size: 12px; font-weight: bold; text-align: center;">
                                                {{ message?.offer_detail.from[0]?.owner?.name }}</p>
                                            <div style="position: absolute;  z-index: 2; top: 28px; left: 8px; width: 15px; height: 15px; 
                                                           background-color: #901B6A; color: white; border-radius: 50%; 
                                                           display: flex; align-items: center; justify-content: center; 
                                                          font-size: 16px; font-weight: bold; text-align: center;">
                                                {{ message.offer_detail.from.length }}
                                            </div>

                                            <!-- Swiper -->
                                            <swiper :modules="modules" :slides-per-view="1" :navigation="true"
                                                :pagination="{ clickable: true }" :scrollbar="{ draggable: true }"
                                                class="swiper-container" style="padding-top: 10px;">
                                                <swiper-slide @click="goProductDetail(item)"
                                                    v-for="(item, itemIndex) in message.offer_detail.from"
                                                    :key="itemIndex">


                                                    <ion-card style="
                                                            margin: 0;
                                                            padding:0px;
                                                            padding: 0px;
                                                            box-shadow: none;
                                                            cursor: pointer;
                                                            border-radius: 15px;
                                                            display: flex;
                                                            background-color: #ebebed;
                                                            flex-direction: column;
                                                            gap: 0px;">
                                                        <div style="
                                                            width: 100%;
                                                            height: 100px;
                                                            padding: 5px;
                                                           " class="img-content">
                                                            <img style="  width: 100%; height: 100%; object-fit: contain;"
                                                                :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + item.image" />

                                                        </div>
                                                        <ion-card-header style="padding: 0; ">
                                                            <ion-card-title style="
                                                                            text-align: center;
                                                                            font-family: var(--font-bold), sans-serif;
                                                                            font-size: 14px;
                                                                            margin-bottom: 1px;
                                                                            display: -webkit-box;
                                                                            color: var(--black);
                                                                            padding: 0px;
                                                                            -webkit-line-clamp: 2;
                                                                            -webkit-box-orient: vertical;
                                                                            overflow: hidden;">{{ item.name }}
                                                            </ion-card-title>
                                                            <div class="ion-card-subtitles">
                                                                <ion-card-subtitle style="
                                                                    margin-top: 0;
                                                                    margin-bottom: 5px;
                                                                    text-align: center;
                                                                    font-family: var(--font-medium), sans-serif;
                                                                    color: var(--black);
                                                                    font-size: 10px;">{{ item?.city.name }} / {{
                                                                        item?.district.name }}</ion-card-subtitle>
                                                                <ion-card-subtitle style=" 
                                                                        color: var(--black);
                                                                        font-family: var(--font-medium), sans-serif;
                                                                        font-size: 16px;
                                                                        margin-bottom: 0;" class="price">
                                                                    {{ item.price }}
                                                                </ion-card-subtitle>
                                                            </div>
                                                        </ion-card-header>
                                                    </ion-card>
                                                </swiper-slide>
                                            </swiper>
                                        </div>
                                    </ion-col>


                                    <!-- "Takas" metni için column -->
                                    <ion-col size="2"
                                        style="display: flex; background-color: #E5E5E5;  align-items: center; justify-content: center;">
                                        <img src="../../../assets/yon.png" alt="">
                                    </ion-col>

                                    <!-- 'to' verilerini gösteren column -->
                                    <ion-col
                                        style="background-color: #E5E5E5; border-top-right-radius: 20px; border-bottom-right-radius: 0px;  "
                                        v-if="message.offer_detail.to.length > 0" size="5">
                                        <div style="position: relative;">
                                            <p
                                                style="position: absolute; z-index: 2; top: -15px; left: 20px; color: black; ; font-size: 12px; font-weight: bold; text-align: center;">

                                                {{ message.offer_detail.to[0].owner.name }}
                                            </p>


                                            <!-- Yuvarlak sayı -->
                                            <div
                                                style="position: absolute; top: 28px; left: 10px; width: 15px; height: 15px; 
                                                    background-color: #901B6A; color: white; border-radius: 50%; 
                                                    display: flex; align-items: center; justify-content: center; 
                                                    font-size: 16px; z-index: 2; font-weight: bold; text-align: center;">
                                                {{ message.offer_detail.to.length }}
                                            </div>

                                            <!-- Swiper -->
                                            <swiper :modules="modules" :slides-per-view="1" :navigation="true"
                                                :pagination="{ clickable: true }" :scrollbar="{ draggable: true }"
                                                class="swiper-container" style="padding-top: 10px;">
                                                <swiper-slide @click="goProductDetail(item)"
                                                    v-for="(item, itemIndex) in message.offer_detail.to"
                                                    :key="itemIndex">
                                                    <ion-card style="
                                                            margin: 0;
                                                            padding:0px;
                                                            padding: 0px;
                                                            box-shadow: none;
                                                            cursor: pointer;
                                                            display: flex;
                                                            border-radius: 14px;
                                                            background-color: #ebebed;
                                                            flex-direction: column;
                                                            gap: 0px;">
                                                        <div style="
                                                            width: 100%;
                                                            height: 100px;
                                                            padding: 5px;
                                                            border-radius: 10px;
                                                           " class="img-content">
                                                            <img style="  width: 100%; height: 100%; border-radius: 10px !important;  object-fit: contain;"
                                                                :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + item.image" />

                                                        </div>
                                                        <ion-card-header style="padding: 0; ">
                                                            <ion-card-title style=" 
                                                                            text-align: center;
                                                                            font-family: var(--font-bold), sans-serif;
                                                                            font-size: 14px;
                                                                            margin-bottom: 1px;
                                                                            display: -webkit-box;
                                                                            color: var(--black);
                                                                            padding: 0px;
                                                                            -webkit-line-clamp: 2;
                                                                            -webkit-box-orient: vertical;
                                                                            overflow: hidden;">{{ item.name }}
                                                            </ion-card-title>
                                                            <div class="ion-card-subtitles">
                                                                <ion-card-subtitle style="
                                                                    margin-top: 0;
                                                                    margin-bottom: 5px;
                                                                    text-align: center;
                                                                    font-family: var(--font-medium), sans-serif;
                                                                    color: var(--black);
                                                                    font-size: 10px;">{{ item?.city?.name }} / {{
                                                                        item?.district?.name }}</ion-card-subtitle>
                                                                <ion-card-subtitle style=" 
                                                                        color: var(--black);
                                                                        font-family: var(--font-medium), sans-serif;
                                                                        font-size: 16px;
                                                                        margin-bottom: 0;" class="price">
                                                                    {{ item.price }}
                                                                </ion-card-subtitle>
                                                            </div>
                                                        </ion-card-header>
                                                    </ion-card>
                                                </swiper-slide>
                                            </swiper>
                                        </div>
                                    </ion-col>

                                </template>

                                <!-- Teklif detayları ve butonlar -->
                                <ion-row
                                    v-if="message.offer_detail.from.length > 0 || message.offer_detail.to.length > 0">
                                    <ion-col
                                        style="background-color: #E5E5E5; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;  "
                                        size="12">

                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'request' && userCode !== message?._from"
                                            style="color: black; display: block; font-size: 12px; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Teklif etti
                                        </span>

                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'offer' && userCode === message?._from"
                                            style="color: black; display: block; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Teklif Ettiniz
                                        </span>

                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'request' && userCode === message?._from"
                                            style="color: black; display: block; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Talep ettiniz
                                        </span>
                                        <!-- 
                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'request' && userCode === message?._from"
                                            style="color: black; display: block; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Teklif edildi
                                        </span> -->


                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'offer' && userCode !== message?._from"
                                            style="color: black; display: block; text-align: center">
                                            Ürün için +{{ message.offer_detail.price }} ₺ Para Teklif edildi
                                        </span>

                                        <!-- Talep Durumu
                                   

                                        
                                      

                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'offer' && userCode !== message?._from"
                                            style="color: black; display: block; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Talep edildi
                                        </span>

                                        
                                        <span
                                            v-if="message?.offer_detail.price && message?.offer_detail.offer_type === 'offer' && userCode === message?._from"
                                            style="color: black; display: block; text-align: center">
                                            +{{ message.offer_detail.price }}₺ Para Teklif edildi
                                        </span> -->


                                        <p v-if="message.offer_detail.from.length > 0 && message.offer_detail.to.length > 0"
                                            @click="showOfferDetails(message)" style="
                            text-align:center;
                            color:purple;
                            margin:0px;
                            font-size: 13px;
                            font-weight: bold">
                                            Teklifi İncele
                                        </p>

                                    </ion-col>

                                    <ion-col size="12">

                                        <span v-if="message?.offer_detail.productMessage"
                                            style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); z-index: 1; color: white;">
                                            {{ message.offer_detail.productMessage }}

                                        </span>
                                        <img v-if="message?.offer_detail.productMessage" src="../../../assets/mask.png"
                                            alt="" style="width: 100%; height: auto; display: block;">

                                    </ion-col>

                                    <ion-col style=" display: flex;" size="12" v-if="message._from !== userCode">
                                        <ion-button style="width: 50%;"
                                            :disabled="message.offer_detail.swapStatus === false"
                                            @click="offerResponse('Accept', message)">
                                            Kabul Et
                                        </ion-button>
                                        <ion-button style="width: 50%;"
                                            :disabled="message.offer_detail.swapStatus === false"
                                            @click="offerResponse('Decline', message)">
                                            Red Et
                                        </ion-button>
                                    </ion-col>

                                    <!-- <ion-col size="12" v-if="message._from !== userCode">
                                        
                                    </ion-col> -->

                                    <ion-col size="12" v-if="message._from !== userCode">
                                        <ion-button style="width: 100%;" @click="openFirstModal('karsi', message)"
                                            :disabled="message.offer_detail.swapStatus === false">
                                            Karşı Teklif Ver
                                        </ion-button>
                                    </ion-col>

                                    <ion-col v-if="message._from === userCode" size="12"
                                        style="display: flex; justify-content: center;">
                                        <ion-button style="width:50%; border-radius:5px;"
                                            @click="openFirstModal('newOffer', message)">Yeni teklif Ver
                                        </ion-button>
                                        <ion-button :disabled="message.offer_detail.swapStatus === false"
                                            style="width:50%;" @click="offerResponse('Cancel', message)">Teklifi İptal
                                            Et
                                        </ion-button>
                                    </ion-col>
                                </ion-row>

                                <!-- Yalnızca fiyat bilgisi varsa göster -->
                                <ion-row
                                    v-if="message.offer_detail.from.length === 0 && message.offer_detail.to.length === 0 && message.offer_detail.price != null"
                                    style="width: 100%; display: flex;">
                                    <ion-col size="12">
                                        <p style="
                                                margin:0px;
                                                border-radius: 1vh;
                                                padding: 20px;
                                                margin-bottom: 20px;
                                                background-color: gainsboro;
                                                color:black; text-align: center">
                                            <!-- {{ message.offer_detail.price }}₺ Para Teklifinde bulunuldu -->

                                            <span
                                                v-if="message?.offer_detail.offer_type === 'offer' && userCode === message._from">
                                                Ürün için +{{ message?.offer_detail.price }} ₺ Para teklifi yaptınız

                                            </span>

                                            <span
                                                v-else="message?.offer_detail.offer_type === 'offer' && userCode != message._from">
                                                Ürün için +{{ message?.offer_detail.price }}₺ para teklifinde bulundu
                                            </span>


                                        </p>
                                        <span v-if="message?.offer_detail.productMessage"
                                            style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); z-index: 1; color: white;">
                                            {{ message.offer_detail.productMessage }}

                                        </span>
                                        <img v-if="message?.offer_detail.productMessage" src="../../../assets/mask.png"
                                            alt="" style="width: 100%; height: 100px; display: block;">
                                        <ion-row>
                                            <ion-col size="6" v-if="message._from !== userCode">
                                                <ion-button @click="offerResponse('Accept', message)"
                                                    expand="full">Kabul
                                                    Et</ion-button>
                                            </ion-col>
                                            <ion-col size="6" v-if="message._from !== userCode">
                                                <ion-button @click="offerResponse('Decline', message)" expand="full">Red
                                                    Et</ion-button>
                                            </ion-col>

                                            <ion-col size="12" v-if="message._from !== userCode">
                                                <ion-button @click="openFirstModal('karsi', message)" expand="full"
                                                    :disabled="message.offer_detail.swapStatus === false">
                                                    Karşı Teklif Ver
                                                </ion-button>
                                            </ion-col>


                                            <ion-col size="12" style="padding:0px;" v-if="message._from === userCode">
                                                <ion-button style="width:50%;"
                                                    @click="openFirstModal('newOffer', message)">Yeni Teklif
                                                    Ver</ion-button>
                                                <ion-button :disabled="message.isDisabled == false" style="width:47%;"
                                                    @click="offerResponse('Cancel', message)">Teklifi İptal
                                                    Et</ion-button>
                                            </ion-col>
                                        </ion-row>
                                    </ion-col>
                                </ion-row>

                                <!-- Yalnızca fiyat bilgisi varsa göster
                                <ion-row
                                    v-if="message.offer_detail.from.length > 0 && message.offer_detail.to.length >0 && message.offer_detail.price != null"
                                    style="width: 100%; display: flex;">
                                    <ion-col size="12">
                                        <p style="
                                                margin:0px;
                                                border-radius: 1vh;
                                                padding: 20px;
                                                margin-bottom: 20px;
                                                background-color: gainsboro;
                                                color:black; text-align: center">


                                            <span
                                                v-if="message?.offer_detail.offer_type === 'offer' && userCode === message._from">
                                                Ürün için +{{ message?.offer_detail.price }} ₺ Para teklifi yaptınız

                                            </span>

                                            <span
                                                v-else="message?.offer_detail.offer_type === 'offer' && userCode != message._from">
                                                Ürün için +{{ message?.offer_detail.price }}₺ para teklifinde bulundu
                                            </span>


                                        </p>
                                        <span v-if="message?.offer_detail.productMessage"
                                            style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); z-index: 1; color: white;">
                                            {{ message.offer_detail.productMessage }}

                                        </span>
                                        <img v-if="message?.offer_detail.productMessage" src="../../../assets/mask.png"
                                            alt="" style="width: 100%; height: 100px; display: block;">
                                        <ion-row>
                                            <ion-col size="6" v-if="message._from !== userCode">
                                                <ion-button @click="offerResponse('Accept', message)"
                                                    expand="full">Kabul
                                                    Et</ion-button>
                                            </ion-col>
                                            <ion-col size="6" v-if="message._from !== userCode">
                                                <ion-button @click="offerResponse('Decline', message)" expand="full">Red
                                                    Et</ion-button>
                                            </ion-col>

                                            <ion-col size="12" v-if="message._from !== userCode">
                                                <ion-button @click="openFirstModal('karsi', message)" expand="full"
                                                    :disabled="message.offer_detail.swapStatus === false">
                                                    Karşı Teklif Ver
                                                </ion-button>
                                            </ion-col>


                                            <ion-col size="12" style="padding:0px;" v-if="message._from === userCode">
                                                <ion-button style="width:50%;"
                                                    @click="openFirstModal('newOffer', message)">Yeni Teklif
                                                    Ver</ion-button>
                                                <ion-button :disabled="message.isDisabled == false" style="width:47%;"
                                                    @click="offerResponse('Cancel', message)">Teklifi İptal
                                                    Et</ion-button>
                                            </ion-col>
                                        </ion-row>
                                    </ion-col>
                                </ion-row>
-->
                                <!-- Yalnızca 'message.offer_detail.message' mevcutsa göster -->
                                <ion-col style="background-color: #fff; margin-bottom: 0px; position: relative;"
                                    v-if="message.offer_detail.message" size="12">
                                    <!-- Sohbet Balonu -->
                                    <p :style="{
                                        'background-color': message._from === userCode ? '#901B6A' : 'gainsboro', /* Göndericiye göre renk */
                                        'color': message._from === userCode ? 'white' : 'black',
                                        'margin': '10px 0', /* Yukarı-aşağı boşluk */
                                        'padding': '10px 5px', /* İç dolgu */
                                        'border-radius': '15px', /* Köşe yuvarlama */
                                        'position': 'relative', /* Üçgen için referans */
                                        'width': 'fit-content', /* Metin uzunluğuna göre genişlik */
                                        'max-width': '70%', /* Maksimum genişlik */
                                        'text-align': message._from === userCode ? 'right' : 'left', /* Balon içindeki yazı hizalama */
                                        'box-shadow': '0px 2px 5px rgba(0, 0, 0, 0.2)', /* Hafif gölge */
                                        'float': message._from === userCode ? 'right' : 'left', /* Göndericiye göre sağ/sol hizalama */
                                        'clear': 'both' /* Her balon yeni bir satırda başlar */
                                    }">
                                        {{ message.offer_detail.message }}

                                        <!-- Konuşma Balonunun Sağ Alt Köşesi -->
                                        <img v-if="message._from === userCode" src="../../../assets/sag.png"
                                            alt="sağ ok"
                                            style="position: absolute; bottom: -10px; right: -0px; width: 20px; height: auto;">

                                        <!-- Konuşma Balonunun Sol Alt Köşesi -->
                                        <img v-if="message._from !== userCode" src="../../../assets/sol.png"
                                            alt="sol ok"
                                            style="position: absolute; bottom: -10px; left: -0px; width: 20px; height: auto;">
                                    </p>
                                </ion-col>

                                <!-- Yalnızca 'message.offer_detail.offer_response' mevcutsa göster -->
                                <ion-col v-if="message.offer_detail.offer_response" size="12"
                                    style="display: flex; justify-content: center;  width: 100%; align-items: center;">
                                    <p :style="{
                                        //'background-color': message._from === userCode ? 'gainsboro' : 'gainsboro',
                                        'color': message._from === userCode ? 'black' : 'black',
                                        'font-weight': '',
                                        'margin': '0px',
                                        'border-radius': '1vh',
                                        'padding': '20px',
                                        'float': message._from === userCode ? 'none' : 'none',  /* float: none; ile sıfırlama */
                                        'text-align': message._from === userCode ? 'right' : 'left',
                                    }">
                                        {{ message.offer_detail.offer_response }}
                                    </p>

                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>



                </ion-grid>
                <!--klawye alanı-->
                <ion-row style="bottom: 0px; width: 100%; background-color: #F3F2F6;">
                    <ion-col size="12" style=" display: flex; justify-content: space-around;">
                        <p style="font-size: 10px; cursor: pointer;" @click="autoMessage('Merhaba')">
                            Merhaba</p>
                        <p style="font-size: 10px; cursor: pointer;" @click="autoMessage('Tamam')">
                            Tamam
                        </p>
                        <p style="font-size: 0.625rem; cursor: pointer;" @click="autoMessage('İlgilenmiyorum')">
                            İlgilenmiyorum</p>
                        <p style="font-size: 0.625rem; cursor: pointer;" @click="autoMessage('Acil Alıcıyım')">Acil
                            Alıcıyım</p>
                    </ion-col>

                    <ion-col size="10">
                        <ion-input style="background-color: white; border-radius: 10px;"
                            v-model="formData.offer_detail.message" placeholder="Mesaj Yaz"></ion-input>
                    </ion-col>
                    <ion-col size="2" style="display: flex; justify-content: center; ">
                        <button class="sendBtnİmg" @click="sendOffer('Chat')">
                            <img style="height: 35px;" src="../../../assets/chatButton.png" alt="">
                        </button>
                    </ion-col>
                </ion-row>
            </div>

            <!-- <ion-infinite-scroll @ionInfinite="handleInfiniteScroll" style="display: hidden;">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll> -->


            <ion-modal @did-dismiss="isOfferModalDismiss" id="product-detail-modal-inspect" ref="offerModal"
                :is-open="isOfferModalOpen">
                <ion-row class="swap-container">
                    <ion-col size="12"
                        style="display: flex;  justify-content: center; align-items: center; position: relative;">
                        <p class="ion-text-center" style="font-weight: bold; text-align: center; margin: 0;">Teklifi
                            İnceliyorsun
                        </p>
                        <p @click="isOfferModalDismiss"
                            style="position: absolute; right: 20px; color: #901B6A; margin: 0;">x</p>
                    </ion-col>

                    <ion-col size="12"
                        style="display:flex; padding:0px;  flex-direction:row; justify-content:space-between;">

                        <div
                            style="width: 100%; background-color: #D9D9D9; height: 45px; display: flex; justify-content: space-around; align-items: center;">
                            <p style="margin-right: 100px; font-size: 10px; font-weight: bold;">
                                {{ userInfo?.latest_offer.meOwnerInfo.name }}
                            </p>
                            <p style="margin-right: 20px; font-size: 10px; font-weight: bold;">
                                {{ userInfo?.name }}
                            </p>
                        </div>

                    </ion-col>

                    <ion-col size="5" class="item-scroll">
                        <div v-if="productDetail && productDetail.offer_detail.from && productDetail.offer_detail.from.length > 0"
                            class="scrollable-container">
                            <p style="
    position: absolute; 
    text-align: center; 
    top: 0px; 
    left: 10px; 
    margin: 0; 
    background-color: #901B6A; 
    padding: 0 10px; 
    height: 20px; 
    border-radius: 15px; 
    line-height: 30px; 
    width: auto; 
    min-width:25px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: white; 
    font-size: 14px;
">
                                {{ productDetail.offer_detail.from.length }}
                            </p>
                            <div class="item-container" @click="goProductDetail(veri)"
                                v-for="(veri, itemIndex) in productDetail.offer_detail.from" :key="itemIndex">

                                <div class="img-content" style=" 
                                    width: 100%;
                                    height: 100px;
                                    display: flex;
                                    align-items: flex-start;
                                    justify-content: center;
                                    border-radius: 1vh;    
                                    
                                    padding: 0px">
                                    <img style="width: 100px; height: 80px; object-fit: cover; margin-bottom: 5px;"
                                        :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + veri.image"
                                        alt="Image" />
                                </div>
                                <p style="font-weight: bold;   font-size: 10px; text-align: center; margin: 0;">
                                    {{ veri.name }}</p>
                                <p style="margin:0px; margin-top: 0;
                                     margin-bottom: 1px;
                                    text-align: center;
                                    font-family: var(--font-medium), sans-serif;
                                    font-size: 10px;">{{ veri.price }}</p>
                                <p style="margin:0px; margin-top: 0;
                                        margin-bottom: 1px;
                                        text-align: center;
                                        font-family: var(--font-medium), sans-serif;
                                        font-size: 10px;">{{ veri?.city?.name }} / {{ veri?.district?.name }}</p>

                            </div>

                        </div>
                        <div v-else>
                            <p>No items in 'from'</p>
                        </div>
                    </ion-col>

                    <ion-col size="2" class="center-icon ion-align-self-center">
                        <img src="../assets/yon.png" alt="" />
                    </ion-col>

                    <ion-col size="5" class="item-scroll">
                        <div v-if="productDetail && productDetail.offer_detail.to && productDetail.offer_detail.to.length > 0"
                            class="scrollable-container">
                            <p style="
                                position: absolute; 
                                text-align: center; 
                                top: 0px; 
                                right: 20px; 
                                margin: 0; 
                                background-color: #901B6A; 
                                padding: 0 10px; 
                                height: 20px; 
                                border-radius: 15px; 
                                line-height: 30px; 
                                width: auto; 
                                min-width:25px; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                color: white; 
                                font-size: 14px;    
                                ">
                                {{ productDetail.offer_detail.to.length }}
                            </p>
                            <div class="item-container" @click="goProductDetail(veri)"
                                v-for="(veri, itemIndex) in productDetail.offer_detail.to" :key="itemIndex">

                                <div class="img-content" style=" 
                                    width: 100%;
                                    height: 100px;
                                    display: flex;
                                    align-items: flex-start;
                                    justify-content: center;
                                    border-radius: 1vh;    
                                    
                                    padding: 0px">
                                    <img style="width: 100px; height: 80px; object-fit: cover; margin-bottom: 5px;"
                                        :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + veri.image"
                                        alt="Image" />
                                </div>
                                <p style="font-weight: bold;   font-size: 10px; text-align: center; margin: 0;">
                                    {{ veri.name }}</p>
                                <p style="margin:0px; margin-top: 0;
                                     margin-bottom: 1px;
                                    text-align: center;
                                    font-family: var(--font-medium), sans-serif;
                                    font-size: 10px;">{{ veri.price }}</p>
                                <p style="margin:0px; margin-top: 0;
                                        margin-bottom: 1px;
                                        text-align: center;
                                        font-family: var(--font-medium), sans-serif;
                                        font-size: 10px;">{{ veri?.city?.name }} / {{ veri?.district?.name }}</p>
                            </div>

                        </div>
                        <div v-else>
                            <p>No items in 'from'</p>
                        </div>
                    </ion-col>

                    <ion-col size="12" style="height: 100px; text-align: center; position: relative;">
                        <p style="color: black; margin: 0px; font-size: 12px; text-align: center;">
                            {{ productDetail?.offer_detail.price }} ₺ Para Teklifinde bulunuldu
                        </p>

                        <p style="
        margin: 0px;
        border-radius: 1vh;
        padding: 20px;
        color: white;
        text-align: center;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -45%);
        z-index: 1;">
                            {{ productDetail?.offer_detail.productMessage }}
                        </p>

                        <img v-if="productDetail?.offer_detail.productMessage" src="../../../assets/mask.png" alt=""
                            style="width: 90%; height: auto; margin: auto; display: block;" />
                    </ion-col>

                    <ion-col style=" padding: 5px; display: flex; justify-content: space-around; width: 100%; "
                        size="12" v-if="productDetail?._from !== userCode">
                        <ion-button style="height: 20px; width: 45%; "
                            @click="offerResponse('Accept', productDetail)">Kabul
                            Et</ion-button>
                        <ion-button style="height: 20px; width: 45%; "
                            :disabled="productDetail?.offer_detail.swapStatus == false"
                            @click="offerResponse('Decline', productDetail)">Red Et</ion-button>
                    </ion-col>


                </ion-row>
            </ion-modal>

            <ion-modal @did-dismiss="isFirstModalDismiss" id="product-detail-modal-offer" ref="firstModal"
                :is-open="isFirstModalOpen">
                <ion-row style="height: 40px;  display: flex; justify-content: center; align-items: center">
                    <p @click="isFirstModalDismiss" style="font-weight: bold; color: #901B6A">X</p>
                </ion-row>
                <ion-row class="swap-container">
                    <ion-col size="5" class="item-scroll">
                        <swiper :modules="modules" :slides-per-view="1" :navigation="true"
                            :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
                            <swiper-slide v-for="(i, index) in meSelectedProduct" :key="index">
                                <ion-card style="
                                                            margin: 0;
                                                            padding:0px;
                                                            padding: 0px;
                                                            box-shadow: none;
                                                            cursor: pointer;
                                                            border-radius: 15px;
                                                            display: flex;
                                                            background-color: #ebebed;
                                                            flex-direction: column;
                                                            gap: 0px;">
                                    <div style="
                                                            width: 100%;
                                                            height: 100px;
                                                            padding: 10px;
                                                           " class="img-content">
                                        <img style="  width: 100%; height: 100%; object-fit: contain;"
                                            :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + i.showcase_image" />

                                    </div>
                                    <ion-card-header style="padding: 0; ">
                                        <ion-card-title style=" 
                                                                            text-align: center;
                                                                            font-family: var(--font-bold), sans-serif;
                                                                            font-size: 14px;
                                                                            margin-bottom: 1px;
                                                                            display: -webkit-box;
                                                                            color: var(--black);
                                                                            padding: 0px;
                                                                            -webkit-line-clamp: 2;
                                                                            -webkit-box-orient: vertical;
                                                                            overflow: hidden;">{{ i.name }}
                                        </ion-card-title>
                                        <div class="ion-card-subtitles">
                                            <ion-card-subtitle style="
                                                                    margin-top: 0;
                                                                    margin-bottom: 5px;
                                                                    text-align: center;
                                                                    font-family: var(--font-medium), sans-serif;
                                                                    color: var(--black);
                                                                    font-size: 10px;">{{ i.city.name }} / {{
                                                                        i.district.name }}</ion-card-subtitle>
                                            <ion-card-subtitle style=" 
                                                                        color: var(--black);
                                                                        font-family: var(--font-medium), sans-serif;
                                                                        font-size: 16px;
                                                                        margin-bottom: 0;" class="price">
                                                {{ i.price }}
                                            </ion-card-subtitle>
                                        </div>
                                    </ion-card-header>
                                </ion-card>
                            </swiper-slide>

                            <div @click="openMeMoreProduct"
                                style="width: 100%; margin-top: 10px;   display: flex; justify-content: center; align-items: center;">
                                <button @click="openMeMoreProduct" style="z-index: 999;
                                         font-size: 15px;
                                         font-size: 12px;
                                         padding: 10px 20px;
                                         margin-left: 20px;
                                         width: 100%;
                                         height: 40px;
                                         margin-left: 10px;
                                         color: #333; /* Koyu gri metin rengi */
                                         background-color: #f8f9fa; /* Çok açık gri arka plan rengi */
                                         border: 1px solid #dee2e6; /* Açık gri kenarlık */
                                         border-radius: 5px; /* Yuvarlatılmış köşeler */
                                         box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölge */
                                         cursor: pointer; /* Fare imlecini işaretçi yapar */
                                         transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Geçiş efektleri */
                                         outline: none; /* Butonun odak kenarlığını kaldırır */
                                 " type="button">
                                    İlan Ekle/Kaldır
                                </button>

                            </div>

                        </swiper>
                    </ion-col>

                    <ion-col size="2" class="center-icon ion-align-self-center">
                        <img src="../assets/yon.png" alt="" />
                    </ion-col>

                    <ion-col size="5" class="item-scroll">
                        <swiper :modules="modules" :slides-per-view="1" :navigation="true"
                            :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
                            <swiper-slide v-for="(i, index) in targetSelectedProduct" :key="index">
                                <ion-card style="
                                                            margin: 0;
                                                            padding:0px;
                                                            padding: 0px;
                                                            box-shadow: none;
                                                            cursor: pointer;
                                                            border-radius: 15px;
                                                            display: flex;
                                                            background-color: #ebebed;
                                                            flex-direction: column;
                                                            gap: 0px;">
                                    <div style="
                                                            width: 100%;
                                                            height: 100px;
                                                            padding: 10px;
                                                           " class="img-content">
                                        <img style="  width: 100%; height: 100%; object-fit: contain;"
                                            :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + i.showcase_image" />

                                    </div>
                                    <ion-card-header style="padding: 0; ">
                                        <ion-card-title style=" 
                                                                            text-align: center;
                                                                            font-family: var(--font-bold), sans-serif;
                                                                            font-size: 14px;
                                                                            margin-bottom: 1px;
                                                                            display: -webkit-box;
                                                                            color: var(--black);
                                                                            padding: 0px;
                                                                            -webkit-line-clamp: 2;
                                                                            -webkit-box-orient: vertical;
                                                                            overflow: hidden;">{{ i.name }}
                                        </ion-card-title>
                                        <div class="ion-card-subtitles">
                                            <ion-card-subtitle style="
                                                                    margin-top: 0;
                                                                    margin-bottom: 5px;
                                                                    text-align: center;
                                                                    font-family: var(--font-medium), sans-serif;
                                                                    color: var(--black);
                                                                    font-size: 10px;">{{ i.city.name }} / {{
                                                                        i.district.name }}</ion-card-subtitle>
                                            <ion-card-subtitle style=" 
                                                                        color: var(--black);
                                                                        font-family: var(--font-medium), sans-serif;
                                                                        font-size: 16px;
                                                                        margin-bottom: 0;" class="price">
                                                {{ i.price }}
                                            </ion-card-subtitle>
                                        </div>
                                    </ion-card-header>
                                </ion-card>
                            </swiper-slide>
                            <div @click="openTargetMoreProduct()"
                                style="width: 100%; margin-top: 10px;   display: flex; justify-content: center; align-items: center;">
                                <button @click="openTargetMoreProduct()" style="
                                        z-index: 999;
                                         font-size: 12px;
                                         padding: 10px 15px;
                                         margin-right: 10px;
                                         width: 100%;
                                         height: 40px;
                                         color: #333; /* Koyu gri metin rengi */
                                         background-color: #f8f9fa; /* Çok açık gri arka plan rengi */
                                         border: 1px solid #dee2e6; /* Açık gri kenarlık */
                                         border-radius: 5px; /* Yuvarlatılmış köşeler */
                                         box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölge */
                                         cursor: pointer; 
                                         transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Geçiş efektleri */
                                         outline: none; 
                                 " type="button">
                                    İlan Ekle/Kaldır
                                </button>

                            </div>
                        </swiper>
                    </ion-col>
                </ion-row>


                <ion-row class="offer-settings ion-align-items-start ion-justify-content-start">
                    <ion-col size="12">
                        <ion-grid>
                            <ion-row class="ion-align-items-center ion-justify-content-center"
                                style="margin-bottom: 50px; position: relative; height: 10px;">
                                <ion-col style="position: relative; display: flex; justify-content: center;">
                                    <!-- "Para Teklif Et" Butonu -->
                                    <button :style="{ backgroundColor: selected === 'offer' ? 'purple' : 'gainsboro' }"
                                        style="width: 50%; color: white; position: absolute; left: 20px; font-weight: bold; height: 40px; border-radius: 2vh; z-index: 1;"
                                        @click="selectButton('offer')" expand="full">
                                        Para Teklif Et
                                    </button>

                                    <!-- "Para Talep Et" Butonu -->
                                    <button
                                        :style="{ backgroundColor: selected === 'request' ? 'purple' : 'gainsboro' }"
                                        style="width: 50%; height: 40px; color: white; border-radius: 2vh; position: absolute; right: 25px; z-index: 0;"
                                        @click="selectButton('request')" expand="full">
                                        Para Talep Et
                                    </button>
                                </ion-col>
                            </ion-row>


                            <ion-row class="message-container ion-align-items-center"
                                style="display: flex; align-items: center;">
                                <ion-col size="4" style="display: flex; align-items: center; justify-content: center;">
                                    <ion-label>Fiyat</ion-label>
                                </ion-col>
                                <ion-col size="8" class="offer-price-container"
                                    style="padding: 10px; display: flex; align-items: center;">
                                    <ion-input v-model="formData.offer_detail.price" type="number"
                                        placeholder="Para Miktarı Giriniz"
                                        style="width: 100%;  padding: 5px; border-radius: 5px;"></ion-input>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-col>
                </ion-row>

                <ion-row class="message-container ion-align-items-center" style="display: flex; align-items: center;">
                    <ion-col size="4" style="display: flex; align-items: center; justify-content: center;">
                        <ion-label>Mesaj</ion-label>
                    </ion-col>
                    <ion-col size="6" style=" padding: 10px; display: flex; align-items: center; border-radius: 5px;">
                        <ion-input v-model="formData.offer_detail.productMessage" placeholder="Açıklama Girin"
                            style="width: 100%; color: black; background-color: transparent; border: none;"></ion-input>
                    </ion-col>
                </ion-row>

                <ion-row class="check-container">
                    <ion-col size="12">
                        <ion-radio-group>
                            <ion-item>
                                <ion-radio slot="start" value="end"></ion-radio>
                                <p style="font-size: 10px;">İlan verme kurallarını kabul ediyorum</p>
                            </ion-item>
                        </ion-radio-group>
                        <ion-button @click="sendOffer('Swap')" expand="full">Teklif ver</ion-button>
                    </ion-col>
                </ion-row>
            </ion-modal>

            <!--BENİM ÜRÜNLERİM-->
            <ion-modal @did-dismiss="isMeProductModalDismiss" :is-open="isMeProductModalOpen"
                id="product-detail-modal-me" ref="meProductModal">

                <div class="wrapper">
                    <div>
                        <p style="text-align: center; font-weight: bold;  color:purple;">X</p>
                    </div>

                    <div style="border-bottom: 1px solid gainsboro; width: 100%;">
                        <p style="text-align: center; font-weight: bold;  color:black;">Takaslamak istedigin ilanını seç
                        </p>
                    </div>

                    <swiper :modules="modules" :slides-per-view="3" :space-between="-13" :navigation="true"
                        :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
                        <swiper-slide v-for="(i, index) in meProduct">
                            <ion-card style="height: 170px; background-color: #D9D9D9; padding: 8px " v-if="i.status==true">

                                <ion-card-content style=" padding: 0px;">
                                    <img style="width: 100%; border-radius: 1vh;  height:80px; object-fit:cover;"
                                        :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + i?.showcase_image" />
                                </ion-card-content>

                                <ion-card-header style=" padding: 0px; height: 40px;">
                                    <ion-card-subtitle style="font-size: 12px; text-wrap: nowrap">{{ i?.name
                                        }}</ion-card-subtitle>
                                    <ion-card-title style="font-size: 12px; text-wrap: nowrap">{{ i?.price
                                        }}₺</ion-card-title>

                                </ion-card-header>

                                <div>
                                    <ion-checkbox style="   " id="'checkbox-' + i.product_code"
                                        :data-product-code="i.product_code"
                                        @ionChange="(e: CustomEvent<any>) => MeHandleCheckboxChange(e, i)">
                                    </ion-checkbox>
                                </div>

                            </ion-card>
                        </swiper-slide>
                        <swiper-slide>
                            <ion-card
                                style="height: 170px; width: 100%; background-color: gainsboro; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                <span style="font-size: 40px;  font-weight:bold;  color: #901B6A;">+</span>
                                <p style="margin: 0;">Tüm ilanları gör</p>
                            </ion-card>
                        </swiper-slide>
                    </Swiper>

                    <div
                        style="width: 100%; height: 20px; display: flex; justify-content: center; align-items: center;">
                        <p
                            style="color: white; margin-left: 10px; background-color: #901B6A; border-radius: 50%; padding: 3px 6px; text-align: center; font-size: 12px; margin: 0;">
                            {{ meSelectedProduct.length }}
                        </p>
                        <span style="margin-left: 6px;">İlan seçildi</span>
                    </div>

                    <div class="modal-ok-button" style="display: flex; align-items: center; justify-content: center">
                        <ion-button @click="isMeProductModalOpen = false; isTargetProductModalOpen = true"
                            class="primary">Tamam</ion-button>
                    </div>


                </div>
            </ion-modal>

            <!--KARŞI KULLANICNIN AÇILAN MODALDAKİ ÜRÜNLERİ-->
            <ion-modal @did-dismiss="isTargetProductModalDismiss" :is-open="isTargetProductModalOpen"
                id="product-detail-modal-me" ref="targetProductModal">

                <div class="wrapper">
                    <div>
                        <p style="text-align: center; font-weight: bold;  color:purple;">X</p>
                    </div>
                    <div style="border-bottom: 1px solid gainsboro; width: 100%;">
                        <p style="text-align: center; font-weight: bold;  color:black;">Takaslamak istedigin ilanını seç
                        </p>
                    </div>
                    <swiper :modules="modules" :slides-per-view="3" :space-between="-13" :navigation="true"
                        :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
                        <!-- Ürün slaytları -->
                        <swiper-slide v-for="(i, index) in targetProduct" :key="index">
                            <ion-card style="height: 170px; background-color: #D9D9D9; padding: 8px ">
                                <ion-card-content style="padding: 0px;">
                                    <img style="width: 100%; border-radius: 1vh; height:80px; object-fit:cover;"
                                        :src="'https://takasimos3.s3.eu-north-1.amazonaws.com' + i?.showcase_image" />
                                </ion-card-content>
                                <ion-card-header style="padding: 0px; height: 40px;">
                                    <ion-card-title style="font-size: 12px; text-wrap: nowrap">
                                        {{ i?.price }}₺
                                    </ion-card-title>
                                    <ion-card-subtitle style="font-size: 12px; text-wrap: nowrap">
                                        {{ i?.name }}
                                    </ion-card-subtitle>
                                </ion-card-header>

                                <div>
                                    <ion-checkbox :id="'checkbox-' + i.product_code" :data-product-code="i.product_code"
                                        @ionChange="(e: CustomEvent<any>) => TargethandleCheckboxChange(e, i)">
                                    </ion-checkbox>
                                </div>
                            </ion-card>
                        </swiper-slide>

                        <swiper-slide>
                            <ion-card
                                style="height: 170px; width: 100%; background-color: gainsboro; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                <span style="font-size: 40px;  font-weight:bold;  color: #901B6A;">+</span>
                                <p style="margin: 0;">Tüm ilanları gör</p>
                            </ion-card>
                        </swiper-slide>
                    </swiper>

                    <div
                        style="width: 100%; height: 20px; display: flex; justify-content: center; align-items: center;">
                        <p
                            style="color: white; margin-left: 10px; background-color: #901B6A; border-radius: 50%; padding: 3px 6px; text-align: center; font-size: 12px; margin: 0;">
                            {{ targetSelectedProduct.length }}
                        </p>
                        <span style="margin-left: 6px;">İlan seçildi</span>
                    </div>

                    <div class="modal-ok-button" style="display: flex; align-items: center; justify-content: center;">
                        <ion-button @click="isTargetProductModalOpen = false; isFirstModalOpen = true"
                            class="primary">Tamam</ion-button>
                    </div>
                </div>
            </ion-modal>

            <!--Takasla Veya Satın Al Modalı-->
            <ion-modal id="product-detail-modal" ref="showChooseModal" :is-open="isSwapChoose"
                @did-dismiss="isSwapModalDismiss">
                <div class="wrapper">
                    <div class="takasimo-logo">
                        <img src="@/assets/takasimo-icon.png" />
                    </div>
                    <div class="modal-close-button ion-activatable ripple-parent">

                        <ion-ripple-effect></ion-ripple-effect>
                    </div>
                    <ion-label>

                    </ion-label>
                    <ion-label>
                        <div class="label2">
                            Hemen şimdi teklif ver!
                        </div>
                    </ion-label>
                    <ion-button v-if="!buyButton" @click="openBuyProductModal" expand="block" class="m-b-10">
                        Satın Al
                    </ion-button>
                    <ion-button @click="openSwapModal" expand="block">
                        Takasla
                    </ion-button>
                </div>
            </ion-modal>

            <!--Satın Alma Modalı-->
            <ion-modal id="product-buy-modal" ref="showBuyModal" :is-open="isBuyModal" @did-dismiss="isBuyModalDismiss">
                <ion-content class="content">
                    <ion-grid>

                        <ion-row>
                            <ion-col size="12" class="modalClose">
                                <p style="margin:0px; font-weight:bold;">Teklif Ver </p>
                                <span>
                                    <ion-icon @click="isBuyModalDismiss"
                                        style="color:purple; font-weight:bold; font-size:24px;" slot="icon-only"
                                        :icon="closeOutline"></ion-icon>
                                </span>
                            </ion-col>
                        </ion-row>

                        <ion-row>
                            <ion-col size="12" class="offerInfo">
                                <p style="margin:0px; font-weight:bold;">Teklif Bilgileri </p>
                            </ion-col>
                        </ion-row>

                        <ion-row class="buy-container">
                            <ion-col size="12" class="item-scroll">
                                <!-- <img v-if="userInfo._from !== userCode"
                                    style="width: 150px; height:70px; object-fit:contain;"
                                    :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${chatMessageList[0].offer_detail.from[0]?.image}`"
                                    alt=""> -->

                                <img v-if="userInfo._from !== userCode"
                                    style="width: 150px; height:70px; object-fit:contain;"
                                    :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${userInfo.latest_offer.to[0]?.image}`"
                                    alt="">
                                <img v-else style="width: 150px; height:70px; object-fit:contain;"
                                    :src="`https://takasimos3.s3.eu-north-1.amazonaws.com${chatMessageList[0].offer_detail.to[0]?.image}`"
                                    alt="">
                                <div class="priceNameInfo">
                                    <p>{{ userInfo.latest_offer.to[0]?.name }}</p>
                                    <p>500₺</p>
                                </div>

                                <div class="userInfo">
                                    <p>{{ userInfo.targetName }} </p>
                                </div>
                            </ion-col>
                        </ion-row>

                        <ion-row class="message-container ion-align-items-end">
                            <ion-col size="4" class="ion-align-items-center ion-justify-content-center flex-col">
                                <ion-label class="custom-label">Teklif</ion-label>
                            </ion-col>
                            <ion-col size="6">
                                <ion-input v-model="formData.offer_detail.price" placeholder="Örn 13.000 ₺"></ion-input>
                            </ion-col>
                        </ion-row>

                        <ion-row class="message-container ion-align-items-end">
                            <ion-col size="4" class="ion-align-items-center ion-justify-content-center flex-col">
                                <ion-label class="custom-label">Mesaj</ion-label>
                            </ion-col>
                            <ion-col size="6">
                                <ion-textarea v-model="formData.offer_detail.productMessage" :col="10" :rows="2"
                                    placeholder="Mesaj"></ion-textarea>
                            </ion-col>
                        </ion-row>



                        <ion-row class="check-container">
                            <ion-col size="12">
                                <ion-radio-group>
                                    <p style="margin:0px;">Kişisel verilerin işlenmesine dair aydınlatma metni</p>

                                    <ion-item>
                                        <ion-radio slot="start" value="end"></ion-radio>
                                        <p style="font-size: 2px;"> İlan verme kurallarını kabul ediyorum</p>
                                    </ion-item>
                                </ion-radio-group>
                                <ion-button @click="sendOffer('Buy')" expand="full">Teklif ver</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-content>
            </ion-modal>

        </ion-content>
    </ion-page>

</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import { IonPage, IonRow, IonCol, IonCheckbox, IonTextarea, IonToolbar, IonCardHeader, IonFooter, IonInfiniteScroll, IonInfiniteScrollContent, IonCardSubtitle, IonCardTitle, IonRadioGroup, IonItem, IonRadio, IonContent, IonCardContent, IonCard, IonGrid, IonButton, IonInput, IonLabel, IonModal, IonIcon, IonRippleEffect } from '@ionic/vue';
import { computed, onMounted, ref, watch } from 'vue';
import { calendarOutline, closeOutline, heart, heartOutline, timeOutline, chevronForward, search, sendOutline, megaphone, phoneLandscape, phonePortrait, constructOutline } from 'ionicons/icons';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { useRoute, useRouter } from "vue-router";
import messageCount from "@/services/messageCount";
const router = useRouter();
const route = useRoute();
const $toast = useToast();

import { useMessageStore } from '@/stores/messageStore';

import io from 'socket.io-client';

const bottomValue = ref('0px');
const positionValue = ref('fixed');

const styleBind = () => {
    bottomValue.value = 230 + 'px';
    positionValue.value = 'fixed';
}



const closeKeyboard = () => {

    bottomValue.value = 0 + 'px';
    positionValue.value = 'fixed';
}
const goBack = () => {
    history.back();

}


import cloneDeep from 'lodash/cloneDeep';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@ionic/vue/css/ionic-swiper.css';

const modules = [Navigation, Pagination, Scrollbar]
const store = useMessageStore();

// Api
import messageApi from '@/services/messageApi';
import authApi from '@/services/authApi';
import productApi from '@/services/productApi';
// import { FetchMessageList } from '@/helpers/messageCount';

const swapMessageCode = computed(() => store.messages);
const messageCodeParams = ref<string>(route?.params?.code as string);


let chatMessageList = ref<any[]>([]);
const selected = ref<'offer' | 'request' | null>('offer');

// Method to update the selected button
function selectButton(type: 'offer' | 'request') {
    selected.value = type;
    console.log(type)
    formData.value.offer_detail.offer_type = type
}

// Data
const meSwapProduct = ref<any[]>([]);
const targetSwapProduct = ref<any[]>([]);
const isFirstModalOpen = ref(false);
const firstModal = ref<HTMLIonModalElement | null>(null);

const isOfferButtonDisabled = ref(null);

const showChooseModal = ref<HTMLIonModalElement | null>(null);
const isSwapChoose = ref(false)

const showBuyModal = ref<HTMLIonModalElement | null>(null);
const isBuyModal = ref(false)

const isMeProductModalOpen = ref(false);
const meProductModal = ref<HTMLIonModalElement | null>(null);

const isTargetProductModalOpen = ref(false);
const targetProductModal = ref<HTMLIonModalElement | null>(null);

const isSwapModalDismiss = () => {
    isSwapChoose.value = false
}

const isBuyModalDismiss = () => {
    isBuyModal.value = false
}

const isOfferModalOpen = ref(false);
const offerModal = ref<HTMLIonModalElement | null>(null);


const openBuyProductModal = () => {
    isBuyModal.value = true
    isSwapChoose.value = false
}

const openSwapModal = () => {
    //isSwapChoose.value = false
    // isFirstModalOpen.value = true;
    isMeProductModalOpen.value = true
}

const isMeProductModalDismiss = () => {
    //isMeProductModalOpen.value = false;
    //isFirstModalOpen.value = true
    openTargetMoreProduct()
    //isTargetProductModalOpen.value = true
    isMeProductModalOpen.value = false
}

const isTargetProductModalDismiss = () => {
    isTargetProductModalOpen.value = false;
}

const isOfferModalDismiss = () => {
    isOfferModalOpen.value = false;
}



const goProfile = (e: any) => {
    console.log('e :>> ', e)
    router.push({ name: 'userDetails', params: { code: e } });
}
const goProfiles = (e: any) => {
    console.log('e :>> ', e)
    router.push({ name: 'userDetails', params: { code: e } });
}

const goProductDetail = (item: any) => {
    isOfferModalOpen.value = false;
    router.push(`/product-detail/${item.product_code}`);
}
const openMeMoreProduct = (e: any) => {
    let items = formData.value.offer_detail.from;
    setTimeout(() => {
        items.forEach((element: any) => {
            //console.log("e", element);

            // Checkbox'ı benzersiz bir şekilde hedefle
            const targetElement = document.querySelector(`ion-checkbox[data-product-code="${element.product_code}"]`) as HTMLInputElement;

            if (targetElement) {
                // Programatik olarak checkbox'ı işaretleyin
                targetElement.checked = true;

                // Event tetikleme
                const customEvent = new CustomEvent('ionChange', {
                    detail: {
                        checked: true,
                        item: element
                    }
                });

                // Event'i checkbox'a gönderin
                targetElement.dispatchEvent(customEvent);

                // Ayrıca MeHandleCheckboxChange fonksiyonunu çağırabilirsiniz
                MeHandleCheckboxChange(customEvent, element);
            }
        });
    }, 200);
    isMeProductModalOpen.value = true;
    fetchMeProduct();

    //isMeProductModalOpen.value = true;

};


let targetUserProduct = ref<string>('');
const meProduct = ref<any[]>([]);
const targetProduct = ref<any[]>([]);
const meSelectedProduct = ref<any[]>([]);
const targetSelectedProduct = ref<any[]>([]);

const roomId = ref<string>(route?.params?.code as string);
let socket = null


const formData = ref<any>({
    message_code: "",
    _to: "",
    message: "test",
    offer_detail: {
        offer_type: "offer",
        price: "",
        message: "",
        productMessage: "",
        swapStatus: true,
        offerStatus: true,
        readStatus: false,
        currency: "TRY",
        from: [],
        to: [],
        // message: "test mesaji",
    },
    from: false,
    to_is_deleted: false
})

const isFirstModalDismiss = () => {
    isFirstModalOpen.value = false;
}

interface UserInfo {
    price: any;
    _from: string;
    _to: string;
    image: string;
    message_code: string;
    name: string;
    product_code: string;
    latest_offer: any;
    targetName: String;
    phone: String;
}








const autoMessage = (event: any) => {
    console.log(event)
    if (event == 'Merhaba') {
        formData.value.offer_detail.message = 'Merhaba'
    }
    if (event == 'Tamam') {
        formData.value.offer_detail.message = 'Tamam'
    }
    if (event == 'İlgilenmiyorum') {
        formData.value.offer_detail.message = 'İlgilenmiyorum'
    }
    if (event == 'Acil Alıcıyım') {
        formData.value.offer_detail.message = 'Acil Alıcıyım'
    }
}



interface District {
    name: string;
}
interface City {
    name: string;
}

interface OfferItem {
    name: string;
    image: string;
    product_code: string;
    price: string;
    city: City;
    district: District
}

interface OfferDetail {
    offer_type: string;
    price: string;
    message: string;
    swapStatus: boolean;
    productMessage: string;
    currency: string;
    from: OfferItem[];
    to: OfferItem[];
}

interface ProductDetail {
    _from: string;
    _to: string;
    offer_detail: OfferDetail;
    price: string;
}


// Global veya dosya genelinde tanımlanan veri
const productDetail = ref<ProductDetail | null>(null); // Tek bir nesne veya null olarak tanımla
// const isOfferModalOpen = ref(false);

// Derin kopyalama yapan fonksiyon
const showOfferDetails = (item: ProductDetail) => {
    console.log(item)
    isOfferModalOpen.value = true;
    productDetail.value = item; // Tek bir nesne olarak güncelle
    if (productDetail.value) {
        console.log("Offer Detail:", productDetail.value.offer_detail);
    } else {
        console.log("Product detail is null");
    }
};

const fetchTargetUserProduct = async () => {
    try {
        const res = await productApi.getOwnerProducts(targetUserProduct.value);
        let items = res.data.data;
        let owner = items[0].owner; // owner bilgisi 

        items.forEach((element: any) => {
          if(element.product.status == true){
            const product = element.product;
            // owner'ı her ürüne ekle
            const productWithOwner = { ...product, owner: owner };

            // Kontrol et ve ekle
            if (!targetProduct.value.some(existingProduct => existingProduct.product_code === product.product_code)) {
                targetProduct.value.push(productWithOwner); // owner'lı ürünü ekle
            }
          }
        });

    } catch (err) {
        console.error("Error fetching target user products:", err);
    }
};


const buyButton = ref(false)
// const fetchMeProduct = async () => {
//     try {
//         const res = await authApi.meProducts();
//         let items = res.data.products;
//         let owner = {
//             name:res.data.name,    
//         }
//         let item = items.filter((e: { product_code: any; }) => e.product_code === userInfo.value.latest_offer.targetOwnerInfo.product_code);
//         if (item.length > 0) {
//             buyButton.value = true
//         } else {
//             buyButton.value = false
//         }
//         console.log(buyButton.value)

//         if (items && Array.isArray(items)) {
//             // Mevcut ürünleri bir Set içinde sakla
//             const existingProductIds = new Set(meProduct.value.map((product: any) => product.ad_no));

//             // Yeni ürünleri işleyip sadece eksik olanları ekle
//             const newProducts = items
//                 .slice(0, 100)
//                 .map((element: any) => element.product)
//                 .filter((product: any) => !existingProductIds.has(product.ad_no));
//             console.log("NEW",...newProducts)
//             meProduct.value = [...meProduct.value, ...newProducts];
//         } else {
//             meProduct.value = []; // Veri yoksa boş bir dizi ile başla
//         }
//     } catch (error) {
//         console.error('Ürünler alınırken bir hata oluştu:', error);
//         meProduct.value = []; // Hata durumunda boş bir dizi ile başla
//     }
// }

const fetchMeProduct = async () => {
    try {
        const res = await authApi.meProducts();
        let items = res.data.products;
        let owner = {
            name: res.data.name,
        };
        let item = items.filter((e: { product_code: any; }) => e.product_code === userInfo.value.latest_offer.targetOwnerInfo.product_code);
        if (item.length > 0) {
            buyButton.value = true;
        } else {
            buyButton.value = false;
        }
        console.log(buyButton.value);

        if (items && Array.isArray(items)) {
            // Mevcut ürünleri bir Set içinde sakla
            const existingProductIds = new Set(meProduct.value.map((product: any) => product.ad_no));

            // Yeni ürünleri işleyip sadece eksik olanları ekle
            const newProducts = items
                .slice(0, 100)
                .map((element: any) => ({
                    ...element.product,
                    owner: owner, // owner objesini her ürüne ekle
                }))
                .filter((product: any) => product.status === true && !existingProductIds.has(product.ad_no));

            console.log("NEW", ...newProducts);
            meProduct.value = [...meProduct.value, ...newProducts];
        } else {
            meProduct.value = []; // Veri yoksa boş bir dizi ile başla
        }
    } catch (error) {
        console.error('Ürünler alınırken bir hata oluştu:', error);
        meProduct.value = []; // Hata durumunda boş bir dizi ile başla
    }
};




const openTargetMoreProduct = () => {
    let items = formData.value.offer_detail.to;
    //console.log("items", items);

    setTimeout(() => {
        items.forEach((element: any) => {
            //console.log("e", element);

            // Checkbox'ı benzersiz bir şekilde hedefle
            const targetElement = document.querySelector(`ion-checkbox[data-product-code="${element.product_code}"]`) as HTMLInputElement;

            if (targetElement) {
                // Programatik olarak checkbox'ı işaretleyin
                targetElement.checked = true;

                // Event tetikleme
                const customEvent = new CustomEvent('ionChange', {
                    detail: {
                        checked: true,
                        item: element
                    }
                });

                // Event'i checkbox'a gönderin
                targetElement.dispatchEvent(customEvent);

                // Ayrıca MeHandleCheckboxChange fonksiyonunu çağırabilirsiniz
                TargethandleCheckboxChange(customEvent, element);
            }
        });
    }, 1000);

    fetchTargetUserProduct()
    isTargetProductModalOpen.value = true
}

const openFirstModal = (item: any, e: any) => {
    //console.log("e", e);
    if (item === "karsi") {
        console.log("Karsi Teklif FormDatasi", formData.value)
        //console.log("karsi",formData.value._from);
        //console.log(e.offer_detail);
        //console.log(formData.value),
        //formData.value._to = userInfo.value._from;

        if (userInfo.value._from == userCode.value) {
            formData.value._to = userInfo.value._to;
        } else {
            formData.value._to = userInfo.value._from;
        }
        console.log("from veirleir", e.offer_detail.from)
        console.log(userInfo.value._from);
        if (e.offer_detail && Array.isArray(e.offer_detail.from) && Array.isArray(e.offer_detail.from)) {
            // `to` dizisindeki her bir öğeyi `itemsArray` objesine dönüştür

            const itemsArray = e.offer_detail.from.map((from: any) => ({
                product_code: from.product_code,
                name: from.name,
                showcase_image: from.image,
                price: from.price,
                city: from.city,
                district: from.district,
                owner: from.owner
            }));
            //formData.value._to = userInfo.value._to;
            formData.value.offer_detail.price = e.offer_detail.price;
            formData.value.offer_detail.productMessage = e.offer_detail.productMessage;

            // `from` dizisindeki her bir öğeyi `itemsArray2` objesine dönüştür
            const itemsArray2 = e.offer_detail.to.map((to: any) => ({
                product_code: to.product_code,
                name: to.name,
                showcase_image: to.image,
                price: to.price,
                city: to.city,
                district: to.district,
                owner: to.owner

            }));

            //console.log(itemsArray);

            // `meSelectedProduct` ve `targetSelectedProduct` dizilerindeki mevcut `product_code` değerlerini bir kümeye ekle
            const meSelectedProductCodes = new Set(meSelectedProduct.value.map(item => item.product_code));
            const targetSelectedProductCodes = new Set(targetSelectedProduct.value.map(item => item.product_code));

            // `itemsArray`'i `meSelectedProduct` dizisine ekle (aynı product_code varsa ekleme)
            itemsArray.forEach((item: {
                name: any; showcase_image: any; product_code: any; price: any; city: any; district: any; owner: any;
            }) => {
                //console.log(itemsArray)
                if (!meSelectedProductCodes.has(item.product_code)) {
                    //burda tersine işlem yaptık 
                    targetSelectedProduct.value.push(item);
                    meSelectedProductCodes.add(item.product_code);

                    if (Array.isArray(formData.value.offer_detail.from)) {
                        // `item`'in `product_code` değerini kontrol et
                        const itemProductCode = item.product_code;

                        // formData'daki product_code'ları kontrol et
                        const exists = formData.value.offer_detail.from.some((existingItem: any) => existingItem.product_code === itemProductCode);

                        if (!exists) {
                            // Yeni bir nesne oluştur ve sadece gerekli bilgileri ekle
                            const newItem = {
                                product_code: item.product_code,
                                name: item.name,
                                image: item.showcase_image,
                                price: item.price,
                                city: item.city,
                                district: item.district,
                                owner: item.owner
                            };

                            // formData'ya yeni ürünü ekle
                            formData.value.offer_detail.to.push(newItem);
                            //console.log('Yeni ürün eklendi:', newItem);
                            //console.log('Güncellenmiş formData:', formData.value);
                        } else {
                            //console.log('form İçinde mevcut Olan Ürün:', item);
                        }
                    }

                }
            });

            //console.log("MeSelected", meSelectedProduct.value);

            // `itemsArray2`'yi `targetSelectedProduct` dizisine ekle (aynı product_code varsa ekleme)
            itemsArray2.forEach((item: { name: any; showcase_image: any; product_code: any; price: any; city: any; district: any; owner: any; }) => {
                if (!targetSelectedProductCodes.has(item.product_code)) {
                    //burda tersine işlem yaptık 
                    meSelectedProduct.value.push(item);
                    targetSelectedProductCodes.add(item.product_code);

                    if (Array.isArray(formData.value.offer_detail.to)) {
                        // `item`'in `product_code` değerini kontrol et
                        const itemProductCode = item.product_code;

                        // formData'daki product_code'ları kontrol et
                        const exists = formData.value.offer_detail.from.some((existingItem: any) => existingItem.product_code === itemProductCode);

                        if (!exists) {
                            // Yeni bir nesne oluştur ve sadece gerekli bilgileri ekle
                            const newItem = {
                                product_code: item.product_code,
                                name: item.name,
                                image: item.showcase_image,
                                price: item.price,
                                city: item.city,
                                district: item.district,
                                owner: item.owner
                            };

                            // formData'ya yeni ürünü ekle
                            formData.value.offer_detail.from.push(newItem);
                            //console.log('Yeni ürün eklendi:', newItem);
                            ///console.log('Güncellenmiş formData:', formData.value);
                        } else {
                            //console.log('form İçinde mevcut Olan Ürün:', item);
                        }
                    }

                }
            });

            isFirstModalOpen.value = true;

            // Ürünleri çek
            fetchMeProduct();
        } else {
            console.warn("Geçersiz `e` nesnesi veya `offer_detail.from` dizisi");
        }
    } else if (item === 'newOffer') {
        //console.log("newOffer",formData.value)
        if (userInfo.value._from == userCode.value) {
            formData.value._to = userInfo.value._to;
        } else {
            formData.value._to = userInfo.value._from;
        }
        meSelectedProduct.value = [];
        targetSelectedProduct.value = []
        //console.log(formData.value)
        formData.value.offer_detail.from = []
        formData.value.offer_detail.to = []
        //isFirstModalOpen.value = true;
        isSwapChoose.value = true
        fetchMeProduct()
    }
};


const MeHandleCheckboxChange = (event: CustomEvent, item: any): void => {
    //console.log(item);
    //console.log("mEsELECT", meSelectedProduct.value);
    console.log("gelen item", item)
    if (Array.isArray(formData.value.offer_detail.from)) {
        // `item`'in `product_code` değerini kontrol et
        const itemProductCode = item.product_code;

        // formData'daki product_code'ları kontrol et
        const exists = formData.value.offer_detail.from.some((existingItem: any) => existingItem.product_code === itemProductCode);

        if (!exists) {
            // Yeni bir nesne oluştur ve sadece gerekli bilgileri ekle
            const newItem = {
                product_code: item.product_code,
                name: item.name,
                image: item.showcase_image,
                city: item.city,
                district: item.district,
                owner: item.owner
            };

            // formData'ya yeni ürünü ekle
            formData.value.offer_detail.from.push(newItem);
            //console.log('Yeni ürün eklendi:', newItem);
            console.log('Güncellenmiş formData:', formData.value);
        } else {
            console.log('Aynı Ürün Tekrar Eklendi mi kontrol et:', formData.value);
        }
    } else {
        console.error('formData.value.offer_detail.from dizisi değil');
    }

    const isChecked = (event.detail as { checked: boolean }).checked;

    if (isChecked) {
        // Eğer `item` daha önce `meProduct` dizisinde yoksa ekle
        if (!meSelectedProduct.value.some(existingItem => existingItem.product_code === item.product_code)) {
            meSelectedProduct.value.push(item);

            //console.log("MeSelected",meSelectedProduct.value);
            // console.log(targetSelectedProduct.value);
            $toast.success('Ürün Takasa eklendi', { position: 'top' });
        } else {
            // Eğer ürün zaten takasta ise kullanıcıya bilgi ver
            //$toast.warning('Bu ürün zaten takasta', { position: 'top-right' });
            //console.log("sdfsdf", meSelectedProduct.value)
        }
    } else {
        // Ürün checkbox'ı işaretlenmemişse ve `meProduct` dizisinde varsa, çıkar
        if (meSelectedProduct.value.some(existingItem => existingItem.product_code === item.product_code)) {
            meSelectedProduct.value = meSelectedProduct.value.filter((element: any) => element.product_code !== item.product_code);
            $toast.info('Ürün Takastan Çıkartıldı', { position: 'top' });

            // Aynı ürün `formData`'dan çıkar
            formData.value.offer_detail.from = formData.value.offer_detail.from.filter((element: any) => element.product_code !== item.product_code);
            console.log('Çıkarılan `formData`:', formData.value.offer_detail.from);
        }
    }
};

const TargethandleCheckboxChange = (event: CustomEvent, item: any): void => {
    console.log("karsi item check", item);

    if (Array.isArray(formData.value.offer_detail.to)) {
        // `item`'in `product_code` değerini kontrol et
        const itemProductCode = item.product_code;

        // formData'daki product_code'ları kontrol et
        const exists = formData.value.offer_detail.to.some((existingItem: any) => existingItem.product_code === itemProductCode);

        if (!exists) {
            // Yeni bir nesne oluştur ve sadece gerekli bilgileri ekle
            const newItem = {
                product_code: item.product_code,
                name: item.name,
                image: item.showcase_image,
                city: item.city,
                district: item.district,
                owner: item.owner
            };

            // formData'ya yeni ürünü ekle
            formData.value.offer_detail.to.push(newItem);
            //console.log('Yeni ürün eklendi:', newItem);
            //console.log('Güncellenmiş formData:', formData.value.offer_detail.to);
        } else {
            //console.log('form İçinde mevcut Olan Ürün:', item);
            console.log("veri", formData.value)
        }
    } else {
        console.error('formData.value.latest_offer.from dizisi değil');
    }

    const isChecked = (event.detail as { checked: boolean }).checked;

    if (isChecked) {
        // Eğer `item` daha önce `meProduct` dizisinde yoksa ekle
        if (!targetSelectedProduct.value.some(existingItem => existingItem.product_code === item.product_code)) {
            targetSelectedProduct.value.push(item);
            //console.log(targetSelectedProduct.value);
            $toast.success('Ürün Takasa eklendi', { position: 'top' });
        } else {
            // Eğer ürün zaten takasta ise kullanıcıya bilgi ver
            //$toast.warning('Bu ürün zaten takasta', { position: 'top-right' });
        }
    } else {
        // Ürün checkbox'ı işaretlenmemişse ve `meProduct` dizisinde varsa, çıkar
        if (targetSelectedProduct.value.some(existingItem => existingItem.product_code === item.product_code)) {
            targetSelectedProduct.value = targetSelectedProduct.value.filter((element: any) => element.product_code !== item.product_code);

            // Aynı ürün `formData`'dan çıkar
            formData.value.offer_detail.to = formData.value.offer_detail.to.filter((element: any) => element.product_code !== item.product_code);
            console.log('Çıkarılan `formData`:', formData.value.offer_detail.to);
            $toast.info('Ürün Takastan Çıkartıldı', { position: 'top' });
        }
    }
}

const handleInfiniteScroll = async (event: Event) => {
    const infiniteScrollEvent = event as CustomEvent;

    // Yalnızca sayfa numarasını artır ve verileri al
    if (page.value < totalPage.value) {
        page.value++;

        try {
            await fetchMessageDetails();
        } catch (error) {
            console.error('Veri alırken bir hata oluştu:', error);
        }
    }

    // Infinite scroll'ün tamamlandığını belirtmek için
    (infiniteScrollEvent.target as HTMLIonInfiniteScrollElement).complete();
};


const sendOffer = async (e: any) => {
    bottomValue.value = '0px';
    setTimeout(() => {
        const contentRoot = document.getElementById('grid');
        if (contentRoot) {
            contentRoot.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 1000)


    if (e == 'Swap' || e == 'Chat') {
        try {
            if (userInfo.value._from == userCode.value) {
                formData.value._to = userInfo.value._to;
            } else {
                formData.value._to = userInfo.value._from;
            }
            // Mesajı gönder ve yanıtı bekle
            const res = await messageApi.sendSingleMessage(formData.value);
            // console.log(res.data);
            //console.log(formData.value);

            // Başarılı işlem mesajı

            // $toast.success('Takas Teklifi İletildi', { position: 'top' });

            // Mesaj detaylarını güncelle
            await fetchMessageDetails();

            // Modalı kapat
            isFirstModalOpen.value = false;

            // Form verilerini sıfırla, ancak message_code ve _to'yu koru
            const { message_code, _to } = formData.value;
            formData.value = {
                message_code,
                _to,
                message: "test",  // Varsayılan değer
                offer_detail: {
                    offer_type: "offer",
                    price: "",
                    message: "",
                    swapStatus: true,  // Tekrarlanan özellik kaldırıldı
                    readStatus: false,
                    currency: "TRY",
                    from: [],
                    to: [],
                },
                from: false,         // Varsayılan değer
                to_is_deleted: false // Varsayılan değer
            };


        } catch (error) {
            console.error('Mesaj gönderme sırasında bir hata oluştu:', error);
            // Kullanıcıya uygun bir hata mesajı göstermek iyi olabilir
            $toast.error('Mesaj gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.', { position: 'top' });
        }
    }
    if (e == 'Buy') {
        try {
            if (userInfo.value._from == userCode.value) {
                formData.value._to = userInfo.value._to;
            } else {
                formData.value._to = userInfo.value._from;
            }
            const res = await messageApi.sendSingleMessage(formData.value);
            console.log(res.data);
            isBuyModal.value = false;
            fetchMessageDetails()
        } catch (error) {
            console.error('Mesaj gönderme sırasında bir hata oluştu:', error);
        }
    }

};

// setInterval(() => {
//     const contentRoot = document.getElementById('grid');
//     if (contentRoot) {
//         contentRoot.scrollIntoView({ behavior: 'smooth', block: 'end' });
//     } 
// },1000)


let totalPage = ref<number>(1)
let page = ref<number>(1)
let message_code = ref<string>('');
const getMessageDetails = async () => {
    try {
        //  console.log(formData.value.message_code, "test")
        const res = await messageApi.getChatDetails(1, messageCodeParams.value);
        formData.value.message_code = res.data.data[0].message_code;
        message_code.value = res.data.data[0].message_code;
        // console.log(res)
    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
    }
};

getMessageDetails()

const offerResponse = async (e: any, message: any) => {
    const { message_code, _to, productMessage } = formData.value; // `message_code` ve `_to` her durumda kullanılacak
    const from = message.offer_detail.from;
    const to = message.offer_detail.to;

    if (e === "Decline") {

        const updateData = {
            message_code: message.message_code,
            //_to: userCode === message._from ? message._to : message._from,
            message_detail_code: message.message_detail_code,
            message: "Teklif Red Edildi",
            offer_detail: {
                offer_type: "offer",
                swapStatus: false,
                offerStatus: false,
                readStatus: false,
                productMessage: message.offer_detail.productMessage,
                price: message.offer_detail.price,
                offer_response: "Teklif Red Edildi",
                currency: "TRY",
                from: from,
                to: to
            },
            //from: false,
            //to_is_deleted: false
        };

        try {
            // API çağrısını yap
            const res = await messageApi.updateSwapStatus(updateData);
            console.log(res.data);
            // console.log("Tekl Red doneni", updateData)
            fetchMessageDetails()
            // Başarı mesajını göster
            //$toast.success('Takas Teklifi İptal Edildi', { position: 'top' });

            chatMessageList.value = chatMessageList.value.map(msg =>
                msg.message_detail_code === message.message_detail_code
                    ? { ...msg, isDisabled: res.data.offer_detail.swapStatus }
                    : msg
            );
        } catch (error) {
            console.error('Mesaj güncelleme sırasında bir hata oluştu:', error);
        }


        const emptyFormData = {
            message_code,
            _to: userCode === message._from ? message._to : message._from,
            message_detail_code: message.message_detail_code,
            message: "Teklif Red Edildi",
            offer_detail: {
                offer_type: "offer",
                swapStatus: false,
                productMessage: "",
                price: "",
                offer_response: "TEKLİF RED EDİLDİ",
                currency: "TRY",
                from: [],
                to: []
            },
            from: false,
            to_is_deleted: false
        };

        const res = await messageApi.sendSingleMessage(emptyFormData);

        isOfferModalOpen.value = false;

    }  else if (e === "Accept") {
        // Form verilerini hazırla
       
        const updateData2 = {
            message_code: message.message_code,
            //_to: userCode === message._from ? message._to : message._from,
            message_detail_code: message.message_detail_code,
            message: "Teklif Kabul Edildi",
            offer_detail: {
                offer_type: "offer",
                swapStatus: false,
                offerStatus: false,
                readStatus: false,
                productMessage: message.offer_detail.productMessage,
                price: message.offer_detail.price,
                offer_response: "Teklif Kabul Edildi",
                currency: "TRY",
                from: from,
                to: to
            },
            //from: false,
            //to_is_deleted: false
        };

        try {
            const res = await messageApi.updateSwapStatus(updateData2);
            console.log(res.data);
            //console.log(formData.value);

            //$toast.success('Takas Teklifi İletildi', { position: 'top' });

            await fetchMessageDetails();
            isFirstModalOpen.value = false;

            // Form verilerini sıfırla
            formData.value = {
                message_code,
                _to,
                message: "",
                offer_detail: {
                    offer_type: "offer",
                    price: "",
                    message: "",
                    currency: "TRY",
                    swapStatus: true,
                    readStatus: false,
                    from: [],
                    to: [],
                },
                from: false,
                to_is_deleted: false
            };

            chatMessageList.value = chatMessageList.value.map(msg =>
                msg.message_detail_code === message.message_detail_code
                    ? { ...msg, isDisabled: res.data.offer_detail.swapStatus }
                    : msg
            );

        } catch (error) {
            console.error('Mesaj gönderme sırasında bir hata oluştu:', error);
        }
        const emptyFormData = {
            message_code,
            _to: userCode === message._from ? message._to : message._from,
            message_detail_code: message.message_detail_code,
            message: "Teklif Kabul Edildi",
            offer_detail: {
                offer_type: "offer",
                swapStatus: false,
                productMessage: "",
                price: "",
                offer_response: "TEKLİF KABUL EDİLDİ",
                currency: "TRY",
                from: [],
                to: []
            },
            from: false,
            to_is_deleted: false
        };

        const res = await messageApi.sendSingleMessage(emptyFormData);
        isOfferModalOpen.value = false;
    }
    else if (e === "Cancel") {
        // `message` nesnesindeki `offer_detail`'den `from` ve `to` dizilerini al
        const from = message.offer_detail.from;
        const to = message.offer_detail.to;

        const updateData = {
            message_code: message.message_code,
            _to: userCode === message._from ? message._from : message._to,
            message_detail_code: message.message_detail_code,
            message: "TEKLİF İPTAL EDİLDİ",
            offer_detail: {
                offer_type: "offer",
                swapStatus: false,
                readStatus: false,
                productMessage: message.offer_detail.productMessage,
                price: message.offer_detail.price,
                offer_response: "TEKLİF İPTAL EDİLDİ",
                currency: "TRY",
                from: from,
                to: to
            },
            from: false,
            to_is_deleted: false
        };

        try {
            // API çağrısını yap
            const res = await messageApi.updateSwapStatus(updateData);
            console.log("teklif iptal doneni", updateData)

            // İlgili mesajın buton durumunu güncelle
            chatMessageList.value = chatMessageList.value.map(msg =>
                msg.message_detail_code === message.message_detail_code
                    ? { ...msg, isDisabled: res.data.offer_detail.swapStatus }
                    : msg
            );
            $toast.success('Takas Teklifi İptal Edildi', { position: 'top' });

            const cancelData = {
                message_code,
                _to: userCode === message._from ? message._to : message._from,
                message_detail_code: message.message_detail_code,
                message: "Teklif İptal Edildi",
                offer_detail: {
                    offer_type: "offer",
                    swapStatus: false,
                    productMessage: "",
                    price: "",
                    offer_response: "TEKLİF İPTAL EDİLDİ",
                    currency: "TRY",
                    from: [],
                    to: []
                },
                from: false,
                to_is_deleted: false
            };
            const rest = await messageApi.sendSingleMessage(cancelData);

        } catch (error) {
            console.error('Mesaj güncelleme sırasında bir hata oluştu:', error);
        }
    }
};

const fetchMessageDetails = async () => {
    try {
        // İlk olarak getMessageDetails'ı çağır ve tamamlanmasını bekle
        await getMessageDetails();

        // getMessageDetails tamamlandığında, message_code kullanarak verileri al
        const res = await messageApi.getChatDetails(page.value, swapMessageCode.value);
        const items = res.data.data;
        // console.log("chatDetails", items);

        const updatePromises = items.map(async (item: { _to: string; offer_detail: { readStatus: boolean; }; }) => {
            // offer_detail içindeki readStatus'u sadece userCode.value === item._from ise true yap
            if (userCode.value === item._to) {
                console.log(userCode.value, item._to);
                item.offer_detail.readStatus = true;
            }

            // Güncellenmiş item'ı API'ye gönder ve item._from ile birlikte dön
            const updateResult = await messageApi.updateSwapStatus(item);
            return { updateResult, from: item._to }; // updateResult ile item._from'u birlikte döndür
        });

        // Tüm update işlemlerinin tamamlanmasını bekle
        try {
            const updateResults = await Promise.all(updatePromises);
            //console.log("Update Sonuçları:", updateResults);

            // Mesaj listesi alındıktan sonra bu fonksiyonu çağır
            // await FetchMessageList();

            //console.log("Mesaj listesi başarıyla alındı.");
        } catch (error) {
            console.error("Güncellemeler yapılırken hata oluştu:", error);
        }


        totalPage.value = res.data.last_page;

        // Mevcut chatMessageList'teki tüm ID'leri bir küme (Set) içinde sakla
        const existingIds = new Set(chatMessageList.value.map(item => item.message_detail_code));

        // Yeni verileri filtrele ve yalnızca benzersiz olanları ekle
        const newItems = items.filter((item: { message_detail_code: any; }) => !existingIds.has(item.message_detail_code));

        // Verileri topluca güncelle
        if (newItems.length > 0) {
            //Her yeni öğeye isDisabled özelliği ekle
            newItems.forEach((item: { isDisabled: any; isDisabledOfferButton: any; offer_detail: { swapStatus: any; offerStatus: any; }; }) => {
                item.isDisabled = item.offer_detail && item.offer_detail.swapStatus;
                item.isDisabledOfferButton = item.offer_detail && item.offer_detail.offerStatus
            });
            newItems.forEach((item: { isDisabled: any; offer_detail: { swapStatus: any; offerStatus: any; }; }) => {
                item.isDisabled = item.offer_detail && item.offer_detail.swapStatus;
            });
            chatMessageList.value = [...chatMessageList.value, ...newItems];
            console.log(chatMessageList.value)
            //console.log(chatMessageList)
        }
        //console.log("chatMessageList", chatMessageList.value);
    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
    }
};

fetchMessageDetails()

const userCode = computed(() => {
    // LocalStorage'dan kullanıcı verisini çek
    const user = localStorage.getItem('user');

    // Kullanıcı verisini JSON formatına parse et
    const parsedUser = user ? JSON.parse(user) : null;

    // Eğer kullanıcı verisi varsa, user_code değerini döndür
    // Eğer kullanıcı verisi yoksa veya user_code bulunmuyorsa null döndür
    return parsedUser ? parsedUser.user_code : null;
});

const userInfo = computed<UserInfo>(() => store.userInfo as unknown as UserInfo);
console.log("userInfo",userInfo)
productApi.getOwnerProducts(userInfo.value._to).then(res => {
    const owner = res.data.data[0].owner;
    userInfo.value.name = owner.name;
    return productApi.getOwnerProducts(userInfo.value._from);

}).then(res => {

    // console.log('object :>> ', res)
    console.log("teestr", chatMessageList.value)
    //const owner = res.data.data[0].owner;
    userInfo.value.targetName = chatMessageList.value[0].offer_detail.meName


}).catch(error => {
    // console.error('Error fetching owner products:', error);
});
let item = []
item.push(userInfo.value)
item.forEach((element: any) => {
    formData.value._to = element._to
    if (userCode.value !== element._to) {
        targetUserProduct.value = element._to
    } else {
        targetUserProduct.value = element._from
    }
})

watch(() => route.params.code, (params) => {

    if (params) {
        //mesaj okununca bildirimi kaldır
        setTimeout(() => {
            messageCount.getMessageLength().then((res) => {
                console.log("mesaj sayısı", res.data);
                useMessageStore().setMessageCount(res.data);
                console.log(res.data);
            })
        }, 3000)


        console.log('params :>> ', params)
        setTimeout(() => {
            // Sayfayı en üste kaydır
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("scrollBaşta")
            // Bir süre bekle, sonra grid'e kaydır
            setTimeout(() => {
                const contentRoot = document.getElementById('grid');
                if (contentRoot) {
                    contentRoot.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    console.log("scrollSonda")
                }
            }, 500); // İlk kaydırmadan sonra 500ms bekle
        }, 1000); // İlk kaydırma için 1000ms bekle


        chatMessageList.value = [];
        socket = io('https://socket.takasimo.com');

        // Join the message room (conversation)
        socket.emit('joinRoom', route.params.code);

        socket.emit('get_messages', { messageCode: route.params.code, page: 1 });

        // socket.on('messages', (data) => {
        //     console.log(data)
        //     chatMessageList.value = data.reverse()
        // })

        // socket.on('new_message', (messages) => {
        //     chatMessageList.value = messages.reverse()
        //     console.log(messages)
        // });

        socket.on('messages', (messages) => {
            // Sadece belirli bir messageCode'a sahip olan mesajları filtrele
            const filteredMessages = messages.filter((message: { message_code: string | string[]; }) => {
                return message.message_code === route.params.code;
            });

            // Eğer filtrelenmiş mesajlar varsa, onları ters çevir ve ata
            if (filteredMessages.length > 0) {
                chatMessageList.value = filteredMessages.reverse();
                // console.log(filteredMessages);  // Ters çevrilmiş mesajları logla
            } else {
                console.log("No messages found with the given message_code.");
            }
        });


        socket.on('new_message', (newMessage) => {
            // newMessage dizisini kontrol et
            if (Array.isArray(newMessage)) {
                // Belirli bir messageCode'a sahip mesajları filtrele
                const filteredMessages = newMessage.filter((message) => {
                    return message.message_code === route.params.code;
                });

                // Eğer filteredMessages boş değilse güncelle
                if (filteredMessages.length > 0) {
                    chatMessageList.value = filteredMessages.reverse();
                } else {
                    // Boşsa, mevcut listeyi koru (chatMessageList.value)
                    console.log("No new messages with the given message_code, keeping the current list.");
                }

                console.log(filteredMessages);
            } else {
                console.error("newMessage is not an array:", newMessage);
            }
        });

        socket.on('roomJoined', (data) => {
            console.log('Odaya başarıyla katıldınız:', data);
        });

        // Hata veya bağlantı sorunu olduğunda
        socket.on('connect_error', (err) => {
            console.log('Bağlantı hatası:', err.message);
        });
    }




    productApi.getOwnerProducts(userInfo.value._to).then(res => {
        const owner = res.data.data[0].owner;
        userInfo.value.name = owner.name;
        return productApi.getOwnerProducts(userInfo.value._from);

    }).then(res => {

        console.log('object :>> ', res)
        console.log("ttst", chatMessageList.value)
        //const owner = res.data.data[0].owne0,r;
        userInfo.value.targetName = chatMessageList.value[0].offer_detail.meOwnerInfo.name


    }).catch(error => {
        console.error('Error fetching owner products:', error);
    });

});




onMounted(() => {
    messageCount.getMessageLength().then((res) => {
        console.log("mesaj sayısı", res.data);
        useMessageStore().setMessageCount(res.data);
        console.log(res.data);
    })

    setTimeout(() => {
        messageCount.getMessageLength().then((res) => {
            console.log("mesaj sayısı", res.data);
            useMessageStore().setMessageCount(res.data);
            console.log(res.data);
        })
    },2000)

    //     const checkKeyboard = () => {
    //     if (window.innerHeight < 600) {
    //       // Ekran boyutunun küçülmesi klavyenin açıldığını gösterebilir
    //       bottomValue.value = '300px';
    //     } else {

    //       bottomValue.value = '0px';
    //     }
    //   };

    //   window.addEventListener('resize', checkKeyboard);

    setTimeout(() => {
        const contentRoot = document.getElementById('grid');
        if (contentRoot) {
            contentRoot.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, 1000)


    socket = io('https://socket.takasimo.com');

    // Join the message room (conversation)
    socket.emit('joinRoom', route.params.code);

    socket.emit('get_messages', { messageCode: route.params.code, page: 1 });


    socket.on('messages', (messages) => {
        // Sadece belirli bir messageCode'a sahip olan mesajları filtrele
        const filteredMessages = messages.filter((message: { message_code: string | string[]; }) => {
            return message.message_code === route.params.code;
        });

        // Eğer filtrelenmiş mesajlar varsa, onları ters çevir ve ata
        if (filteredMessages.length > 0) {
            chatMessageList.value = filteredMessages.reverse();
            //console.log(filteredMessages);  // Ters çevrilmiş mesajları logla
        } else {
            console.log("No messages found with the given message_code.");
        }
    });


    socket.on('new_message', (newMessage) => {
        // newMessage dizisini kontrol et
        if (Array.isArray(newMessage)) {
            // Belirli bir messageCode'a sahip mesajları filtrele
            const filteredMessages = newMessage.filter((message) => {
                return message.message_code === route.params.code;
            });

            // Eğer filteredMessages boş değilse güncelle
            if (filteredMessages.length > 0) {
                chatMessageList.value = filteredMessages.reverse();
            } else {
                // Boşsa, mevcut listeyi koru (chatMessageList.value)
                console.log("No new messages with the given message_code, keeping the current list.");
            }

            console.log(filteredMessages);


        } else {
            console.error("newMessage is not an array:", newMessage);
        }
    });

    socket.on('roomJoined', (data) => {
        console.log('Odaya başarıyla katıldınız:', data);
    });

    // Hata veya bağlantı sorunu olduğunda
    socket.on('connect_error', (err) => {
        console.log('Bağlantı hatası:', err.message);
    });

    page.value = 1

});



</script>


<style>
.swiper-button-prev::after {
    font-size: 15px !important;
    font-weight: bold !important;
}

.swiper-button-next::after {
    font-size: 15px !important;
    font-weight: bold !important;
}

.swiper-button-prev {
    color: purple !important;

}

.swiper-button-next {
    color: purple !important;
}

.swiper-button-next::after {
    font-size: 15px;
    font-weight: bold;
}

ion-checkbox {
    --border-radius: 50%;
    /* Yuvarlak checkbox */
}

ion-checkbox .checkbox-inner {
    border-radius: 50%;
    /* Yuvarlak kutu */
}

ion-checkbox .checkbox-icon {
    border-radius: 50%;
    /* İçerik kısmının yuvarlak olması için */
}


ion-modal#product-detail-modal-alert {
    --width: 350px;
    --height: fit-content;
    --border-radius: 30px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    --overflow: visible;

    .wrapper {
        padding: 0px 0px 0px 0px;

        .modal-close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 20003;
            cursor: pointer;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .label1 {
            font-size: 14px;
            font-family: var(--font-medium), sans-serif;
            text-align: center;
            line-height: 18px;
            margin-bottom: 10px;
        }

        .label2 {
            font-size: 18px;
            font-family: var(--font-bold), sans-serif;
            margin-bottom: 20px;
            text-align: center;
        }

        ion-button {
            --background: #901B6A;
            color: white;
            margin-bottom: 20px;
            --padding-top: 10px;
            --padding-bottom: 10px;
            --padding-start: 60px;
            --padding-end: 60px;
            --border-radius: 10px;
            --box-shadow: none;
            font-family: var(--font-bold), sans-serif;
            font-size: 16px;
        }
    }
}

.item-scroll {
    /* Bu sınıfın yüksekliğini ihtiyaca göre ayarlayın */
}

.scrollable-container {

    overflow-y: scroll;
    height: 300px;
    /* İçeriğe göre uygun bir yükseklik belirleyin */
}

.item-container {
    margin-bottom: 10px;
    background-color: #E5E5E5;
    height: 140px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 1vh;
    display: flex;
    flex-direction: column;

}

.item-image {
    height: 100px;
    object-fit: contain;
    border-radius: 5px;
    text-align: center;
}




ion-modal#product-detail-modal-offer {
    --width: 100%;
    /* background-color: red; */
    --overflow: visible;

    .wrapper {
        padding: 20px 10px 10px 20px;
        width: 100%;
    }
}

ion-modal#product-detail-modal {
    --width: 80%;
    /* background-color: red; */
    height: 100%;
    --height: fit-content;
    --border-radius: 30px;
    --overflow: visible;



    .wrapper {
        padding: 20px 10px 10px 20px;
        width: 100%;

        .takasimo-logo {
            position: absolute;
            top: -50px;
            left: calc(50% - 50px);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            background: var(--primary);
            width: 100px;
            height: 100px;
            border-radius: 50px;
            z-index: 20003;

            img {
                width: 60px;
                height: 60px;
            }
        }

        .modal-close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 20003;
            cursor: pointer;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ion-row {
            background-color: red;
            margin-bottom: 5px;
        }

        .label1 {
            font-size: 14px;
            font-family: var(--font-medium), sans-serif;
            text-align: center;
            line-height: 18px;
            margin-bottom: 10px;
        }

        .label2 {
            font-size: 18px;
            font-family: var(--font-bold), sans-serif;
            margin-top: 30px;
            text-align: center;
            z-index: 999;
        }

    }
}

ion-modal#product-detail-modal-inspect {
    --width: 95%;

    --height: 590px;
    --border-radius: 30px;
    --overflow: visible;



    .wrapper {
        padding: 20px 10px 10px 20px;
        width: 100%;
        background-color: red;


        .modal-close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 20003;
            cursor: pointer;
            height: 32px;
            width: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ion-row {
            margin-bottom: 5px;
        }




    }
}


ion-modal#product-detail-modal-me {
    --width: 100%;
    height: 100%;
    --height: fit-content;
    --border-radius: 30px;
    --overflow: visible;

    .wrapper {
        padding: 0px 0px 0px 0px;
        width: 100%;

        background-color: #F4F2F2;
        border-radius: 3vh;

        .modal-close-button {

            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }

        ion-row {
            background-color: red;
            margin-bottom: 5px;
        }

        .label1 {
            font-size: 14px;
            font-family: var(--font-medium), sans-serif;
            text-align: center;
            line-height: 18px;
            margin-bottom: 10px;
        }

        .label2 {
            font-size: 18px;
            font-family: var(--font-bold), sans-serif;
            margin-top: 30px;
            text-align: center;
            z-index: 999;
        }

        /* ion-button {
            --background: #d7d2d2;
            --color: var(--black);
            --padding-top: 15px;
            --padding-bottom: 15px;
            --padding-start: 60px;
            --padding-end: 60px;
            --border-radius: 30px;
            --box-shadow: none;
            font-family: var(--font-bold), sans-serif;
            font-size: 16px;
        } */
    }
}



ion-modal#product-buy-modal {
    .modalClose {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: white;
    }

    .offerInfo {
        width: 100%;
        height: 30px;
        background-color: rgb(233, 233, 233);
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
    }

    .flex-col {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 10px;
    }

    .custom-label {
        color: black;
        margin: 0;
        padding: 0;
    }

    .content {
        --padding-bottom: env(safe-area-inset-bottom);
        background-color: blue !important;
        display: flex;
        flex-direction: column;
    }

    .buy-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* Dikey düzenleme */
        align-items: center;
        justify-content: center;
        /* Ortalamak için */

        .item-scroll {
            display: flex;
            padding: 0 10px;
            width: 100%;

            position: relative;
            justify-content: center;
            align-items: center;


            .priceNameInfo {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 0;
                left: 20px;
                font-weight: bold;

                p {
                    margin: 0px;
                }
            }

            .userInfo {
                display: flex;
                flex-direction: column;
                position: absolute;
                bottom: 0;
                right: 20px;
                font-weight: bold;

                p {
                    margin: 0px;
                }
            }

            img {
                height: 150px;
                width: 100%;
                object-fit: contain;
                display: block;
                /* Blok seviyesine al */
            }
        }
    }

    .message-container {
        margin: 20 20px;
        margin-top: 30px;
        /* Kenar boşluklarını düzenle */
        display: flex;
        align-items: center;

        ion-label {
            display: flex;
            align-items: center;
            margin-right: 10px;
            /* Label ve input arasına boşluk bırak */
        }

        ion-input {
            flex: 1;
            --padding-start: 0;
            --padding-end: 0;
            --padding-top: 0;
            --padding-bottom: 0;
            border: none;
        }
    }



    .check-container {
        background-color: rgb(229, 226, 226);
        border-radius: 10px 10px 0 0;
        padding: 10px;
        position: fixed;
        bottom: 0px;
        width: 100%;

        p {
            font-size: 10px;
        }

        ion-button {
            margin-top: 10px;
        }
    }

}
</style>