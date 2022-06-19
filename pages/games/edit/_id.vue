<template>
    <form class="form-container template boxed" @submit="submitHandler">
        <div class="popin-overlay delete" ref="deleteOverlay">
            <div class="confirm-box-wrapper">
                <div class="confirm-box">
                    <div class="confirm-text">Êtes-vous sûr de vouloir supprimer ce projet ?</div>
                    <div class="confirm-text secondary">(Cette action est irréversible.)</div>
                    <ButtonSimple class="decline" color="yellow" type="styled" text="Non" @click.native="closePopin('delete')"/>
                    <ButtonSimple class="confirm" type="blank" text="Oui" @click.native="deleteHandler"/>
                </div>
            </div>
        </div>

        <div class="popin-overlay cancel" ref="cancelOverlay">
            <div class="confirm-box-wrapper">
                <div class="confirm-box">
                    <div class="confirm-text">Êtes-vous sûr de vouloir annuler vos modifications ?</div>
                    <ButtonSimple class="decline" color="yellow" type="styled" text="Non" @click.native="closePopin('cancel')"/>
                    <ButtonSimple class="confirm" type="blank" text="Oui" @click.native="cancelHandler"/>
                </div>
            </div>
        </div>
        <div class="panel left">
            <div class="section">
                <div class="section-title">Informations</div>
                <div class="field">
                    <input ref="inputName" type="text" placeholder="Nom du jeu"
                           :value="`${getSelectGameDatas.fields.name}`">
                </div>

                <div class="field">
                    <input id="year" ref="year" type="number" placeholder="Année de création"
                           :value="`${getSelectGameDatas.fields.year}`">
                </div>

                <div class="field">
                    <input id="players" ref="players" type="number"
                           placeholder="Nombre de joueurs min." :value="`${getSelectGameDatas.fields.players}`">
                </div>

                <div class="field">
                    <textarea id="credits" ref="credits" type="textarea"
                              placeholder="Crédits" :value="`${getSelectGameDatas.fields.credits}`"></textarea>
                </div>

                <div class="field">
                    <textarea id="description" ref="inputDescription" type="textarea" rows=3
                              maxlength="160" minlength="10"
                              placeholder="Description courte (160 char. max)"
                              :value="`${getSelectGameDatas.fields.description}`"></textarea>
                </div>

                <div class="field">
                    <textarea id="descriptionLong" ref="inputDescriptionLong" name="descriptionLong" rows=6
                              type="textarea"
                              maxlength="900" minlength="100"
                              placeholder="Description longue (900 char. max)"
                              :value="`${getSelectGameDatas.fields.longerDescription}`"></textarea>
                </div>
            </div>

            <div class="section">
                <div class="field">
                    <fieldset ref="tags">
                        <div class="checkbox">
                            <label>
                                <span class="checkbox-title">Solo</span>
                                <input ref="onePlayer" type="checkbox" name="filter" class="default__check"
                                       value="Solo" :checked=getSelectGameDatas.fields.filters.onePlayer>
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <span class="checkbox-title">Multijoueurs</span>
                                <input ref="multiPlayer" type="checkbox" name="filter" class="default__check"
                                       value="Multijoueur" :checked=getSelectGameDatas.fields.filters.multiPlayer>
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <span class="checkbox-title">Experience</span>
                                <input ref="experience" type="checkbox" name="filter" class="default__check"
                                       value="Experience" :checked=getSelectGameDatas.fields.filters.experience>
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <span class="checkbox-title">Jeu</span>
                                <input ref="game" type="checkbox" name="filter" class="default__check" value="Jeu"
                                       :checked=getSelectGameDatas.fields.filters.game>
                                <span class="custom__check"></span>
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div class="field flex leaderboard">
                    <label>Afficher le tableau des scores</label>
                    <label>
                        <input id="leaderboard" ref="leaderboard" name="leaderboard" type="checkbox"
                               class="default__check switchbox"
                               :checked=getSelectGameDatas.fields.leaderboardActive>
                        <span class="custom__check"></span>
                    </label>
                </div>
            </div>
        </div>


        <div class="panel right">
            <div class="section">
                <div class="section-title">Projet</div>
                <div class="field">
                    <input id="file" ref="url" name="file" type="text" placeholder="Insérer une URL"
                           :value="`${getSelectGameDatas.fields.url}`">
                    <input @focus="$event.target.select()" readonly id="tokenID" ref="tokenID" name="tokenID"
                           type="text"
                           :value="`${getSelectGameID}`">
                    <ButtonSimple class="token-id-btn" @click.native="copyToClipboard" ref="tokenIDBtn"
                                  text="Copier l'ID" type="styled" color="yellow"/>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Images</div>
                <div class="image-section">
                    <div class="image-wrapper medium" ref="medium">
                        <div class="inputContainer">
                            <input
                                id="mediumImage"
                                ref="mediumImage"
                                type="file"
                                name="mediumImage"
                                accept="image/png, image/jpeg"
                                @change="addedMediumImage">

                            <img class="previewImage" ref="previewMediumImage"
                                 :src="getSelectGameDatas.fields.mediumImage.url" alt=""/>
                            <ButtonSimple text="Aperçu liste (1200x470px)" class="overlay" icon="download"
                                          theme="light"/>

                        </div>
                    </div>

                    <div class="image-wrapper large" ref="large">
                        <div class="inputContainer">
                            <input
                                id="largeImage"
                                ref="largeImage"
                                type="file"
                                name="largeImage"
                                accept="image/png, image/jpeg"
                                @change="addedLargeImage"
                            >

                            <img class="previewImage" ref="previewLargeImage"
                                 :src="getSelectGameDatas.fields.largeImage.url" alt=""/>
                            <ButtonSimple text="Visuel plein écran (2560x1440) " class="overlay" icon="download"/>

                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Couleurs LEDS du menu</div>
                <div ref="colors" class="colorsContainer">
                    <div class="colorContainer">
                        <div class="label">Couleur 1</div>
                        <div class="color-picker-container color1">
                            <div class="hexa-code">{{ color1 }}</div>
                            <div class="preview" :style="{backgroundColor: color1 } "></div>

                            <verte v-model="color1" picker="square" model="hex" ref="color1"
                                   :value="getSelectGameDatas.fields.colors.first"></verte>
                        </div>
                    </div>

                    <div class="colorContainer">
                        <div class="label">Couleur 2</div>
                        <div class="color-picker-container color1">
                            <div class="hexa-code">{{ color2 }}</div>
                            <div class="preview" :style="{backgroundColor: color2 } "></div>
                            <verte v-model="color2" menuPosition="top" picker="square" model="hex"
                                   ref="color2" :value="getSelectGameDatas.fields.colors.secondary"></verte>
                        </div>
                    </div>
                </div>
            </div>

            <div class="action-buttons edit">
                <div class="cancel-edit" @click="openPopin('cancel')">Annuler les modifications</div>
                <div class="second-row">
                    <img class="delete-btn" src="~/assets/images/delete.svg" alt="" @click="openPopin('delete')"/>
                    <ButtonSimple @click.native="submitHandler" ref="submitButton"
                                  :text="success ? 'Jeu mis à jour 👍🏼' : error ? 'Verifiez les infos 🚫' : 'Sauvegarder' "
                                  type="styled"
                                  :success="success" :error="error"/>
                </div>
            </div>
        </div>
    </form>
</template>

<script src="./script.js"></script>
<style src="./../create/style.scss" lang="scss"></style>
