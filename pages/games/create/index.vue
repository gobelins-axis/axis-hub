<template xmlns="http://www.w3.org/1999/html">
    <form class="form-container" @submit="submitHandler">
        <div class="panel left">
            <div class="section">
                <div class="section-title">Informations</div>
                <div class="field">
                    <input ref="inputName" type="text" placeholder="Nom du jeu">
                </div>

                <div class="field">
                    <input id="year" ref="year" type="number" placeholder="Année de création">
                </div>

                <div class="field">
                    <input id="players" ref="players" type="number"
                           placeholder="Nombre de joueurs min.">
                </div>

                <div class="field">
                    <textarea id="credits" ref="credits" type="textarea"
                              placeholder="Crédits"></textarea>
                </div>

                <div class="field">
                    <textarea id="description" ref="inputDescription" type="textarea" rows=3
                              maxlength="160" minlength="10"
                              placeholder="Description courte (160 char. max)"></textarea>
                </div>

                <div class="field">
                    <textarea id="descriptionLong" ref="inputDescriptionLong" name="descriptionLong" rows=6
                              type="textarea"
                              maxlength="900" minlength="100"
                              placeholder="Description longue (900 char. max)"></textarea>
                </div>
            </div>

            <div class="section">
                <div class="field">
                    <fieldset ref="tags">
                        <div class="checkbox">
                            Solo
                            <label>
                                <input ref="onePlayer" type="checkbox" name="filter" class="default__check"
                                       value="Solo">
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            Multijoueurs
                            <label>

                                <input ref="multiPlayer" type="checkbox" name="filter" class="default__check"
                                       value="Multijoueur">
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            Experience
                            <label>

                                <input ref="experience" type="checkbox" name="filter" class="default__check"
                                       value="Experience">
                                <span class="custom__check"></span>
                            </label>
                        </div>
                        <div class="checkbox">
                            Jeu
                            <label>
                                <input ref="game" type="checkbox" name="filter" class="default__check" value="Jeu">
                                <span class="custom__check"></span>
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div class="field flex">
                    <label>Afficher le tableau des scores</label>
                    <label>
                        <input id="leaderboard" ref="leaderboard" name="leaderboard" type="checkbox"
                               class="default__check switchbox">
                        <span class="custom__check"></span>
                    </label>
                </div>
            </div>
        </div>


        <div class="panel right">
            <div class="section">
                <div class="section-title">Projet</div>
                <div class="dropfile-container">
                    <input id="file" ref="file" name="file" type="file" @change="addedFileHandler">
                    <div class="droparea">
                        <p class="file-name" ref="filename">Télécharger le projet</p>
                        <ButtonSimple text="Ajouter" icon="download"/>
                    </div>
                </div>
                <!--                    <div class="id-to-paste-container">-->
                <!--                        <ButtonSimple text="Copier l'ID" class="copy-id" icon="download"/>-->
                <!--                        <input class="id-to-paste" name="name" type="text">-->
                <!--                    </div>-->
            </div>

            <div class="section">
                <div class="section-title">Images</div>
                <div class="image-section">
                    <div class="image-wrapper medium">
                        <div class="inputContainer">
                            <input
                                id="mediumImage"
                                ref="mediumImage"
                                type="file"
                                name="mediumImage"
                                accept="image/png, image/jpeg"
                                @change="addedMediumImage">

                            <img v-if="mediumImageAdded" class="previewImage" ref="previewMediumImage" src="" alt=""/>
                            <ButtonSimple text="Aperçu liste (1200x470px)" class="overlay" icon="download"/>

                        </div>
                    </div>

                    <div class="image-wrapper large">
                        <div class="inputContainer">
                            <input
                                id="largeImage"
                                ref="largeImage"
                                type="file"
                                name="largeImage"
                                accept="image/png, image/jpeg"
                                @change="addedLargeImage"
                            >

                            <img v-if="largeImageAdded" class="previewImage" ref="previewLargeImage" src="" alt=""/>
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
                            <verte v-model="color1" picker="square" model="hex"></verte>
                        </div>
                    </div>

                    <div class="colorContainer">
                        <div class="label">Couleur 2</div>
                        <div class="color-picker-container color1">
                            <div class="hexa-code">{{ color2 }}</div>
                            <div class="preview" :style="{backgroundColor: color2 } "></div>
                            <verte v-model="color2" menuPosition="top" picker="square" model="hex"></verte>
                        </div>
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <ButtonSimple @click.native="submitHandler" ref="submitButton" :text="success ? 'Jeu ajouté' : error ? 'Erreur' : 'Ajouter un jeu' " type="styled" :success="success" :error="error" />
            </div>
        </div>

    </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
