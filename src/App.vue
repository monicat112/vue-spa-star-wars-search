<template>
  <main class="container container--gutter" role="main">
    <div class="block block--cushion box-margin-lg-md">
      <form onSubmit="return false;" role="search" class="search">
        <div class="search__input-wrap">
          <label for="search-field" class="visually-hidden">Searcht</label>
          <input id="search-field" type="text" v-model="search" placeholder="Search by character name" class="form-item-bigger">
        </div>
        <div class="search__button-wrap">
          <button type="button" v-on:click="listBySearch()" id="search-button" class="search__button form-item-bigger">Search</button>
        </div>
      </form>
    </div>

    <div class="grid grid--centered box-margin-sm">
      <div class="grid-cell grid-cell--md-2of3 grid-cell--gender">
        <div class="select-group">
          <label for="gender" class="select-group__title title-label">Gender</label>
          <div class="select-group__select select-wrap">
            <select id="gender" v-model="genderSelect" v-on:change="listByGender()">
              <option value="">Filter by Gender</option>
              <option v-for="gender in genders" v-bind:value="gender.value">
                {{gender.display}} ( {{gender.count}} )
              </option>
            </select>
            <svg class="select-wrap__arrow" width="15.1px" height="8px" viewBox="0 0 15.1 8" preserveAspectRatio="xMinYMin meet" aria-labelledby="chevron-down">
              <path id="chevron-down" fill="#C9CBCF" d="M7,7.8c0.3,0.3,0.9,0.3,1.2,0L15,1.3c0.3-0.2,0.2-0.6,0-0.9l-0.3-0.3c-0.2-0.2-0.7-0.2-0.9,0
              L7.6,6.1L1.4,0.2c-0.3-0.2-0.7-0.2-0.9,0L0.2,0.4c-0.2,0.2-0.2,0.6,0,0.9L7,7.8z"/>
            </svg>

          </div>
        </div>
      </div>

      <div class="grid-cell grid-cell--md-1of3">
        <h2 class="title-label">
          {{ charactersCount }} {{ charactersCountLabel }}
        </h2>
      </div>
    </div>

    <div class="block block--results box-margin-sm-lg" v-bind:class="{'no-results': charactersCount === 0}">
      <ul v-if="charactersCount > 0" class="search-results">
        <li v-for="character in characters.current" class="search-results__item">
          <h3>{{ character.name }}</h3>
          <p class="search-results__meta-list">
            <span v-if="checkAttribute(character.gender)">
              {{ character.gender | formatGender }}
            </span>
            <span v-if="checkAttribute(character.hair_color)">
              {{ character.hair_color | formatHair }}
            </span>
            <span v-if="checkAttribute(character.eye_color)">
              {{ character.eye_color | formatEyes }}
            </span>
          </p>
        </li>
      </ul>

      <div v-else class="no-results__items">
        <svg class="no-results__icon" width="61px" height="61px" viewBox="0 0 61 61" preserveAspectRatio="xMinYMin meet" aria-labelledby="darth-vader-helmet">
          <title id="darth-vader-helmet">Darth Vader</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Initial-State" transform="translate(-282.000000, -302.000000)" fill-rule="nonzero" fill="#BFBFBF">
                  <g id="noun_65913" transform="translate(282.000000, 302.000000)">
                      <path d="M52.2858111,25.2716222 L52.2858111,17.4283778 C52.2858111,7.84324444 44.4418889,0 34.8574333,0 L26.1425667,0 C16.5574333,0 8.71351111,7.84324444 8.71351111,17.4283778 L8.71351111,25.2716222 L0,47.9290556 C0,52.2858111 13.6551889,61 30.5,61 C47.3448111,61 61,52.2858111 61,47.9290556 L52.2858111,25.2716222 Z M17.4283778,53.9199333 C16.5255778,53.9199333 15.7942556,53.1879333 15.7942556,52.2858111 C15.7942556,51.3823333 16.5255778,50.6523667 17.4283778,50.6523667 C18.3318556,50.6523667 19.0625,51.3823333 19.0625,52.2858111 C19.0625,53.1879333 18.3318556,53.9199333 17.4283778,53.9199333 L17.4283778,53.9199333 Z M15.25,30.5 C15.25,29.3016889 15.8559333,27.5496333 16.5940333,26.6075222 C16.5940333,26.6075222 18.6646444,23.9641889 22.875,23.9641889 C25.0113556,23.9641889 26.5017889,24.9462889 26.5017889,24.9462889 C27.5028667,25.6044111 28.3216222,27.1233111 28.3216222,28.3209444 L28.3216222,31.5891889 C28.3216222,32.1876667 27.3415556,32.6783778 26.1432444,32.6783778 L17.4283778,32.6783778 C16.2300667,32.6790556 15.25,31.6976333 15.25,30.5 L15.25,30.5 Z M23.9635111,52.2858111 L21.7851333,52.2858111 L21.7851333,47.9290556 L23.9635111,45.75 L23.9635111,52.2858111 Z M29.4101333,52.2858111 L26.1425667,52.2858111 L26.1425667,43.5716222 L29.4101333,43.5716222 L29.4101333,52.2858111 Z M27.2317556,41.3925667 L27.2317556,38.125 C27.2317556,36.3194 28.6964333,34.8574333 30.5,34.8574333 C32.3042444,34.8574333 33.7675667,36.3194 33.7675667,38.125 L33.7675667,41.3925667 L27.2317556,41.3925667 Z M34.8574333,52.2858111 L31.5898667,52.2858111 L31.5898667,43.5716222 L34.8574333,43.5716222 L34.8574333,52.2858111 Z M39.2141889,52.2858111 L37.0358111,52.2858111 L37.0358111,45.75 L39.2141889,47.9290556 L39.2141889,52.2858111 Z M43.5716222,53.9199333 C42.6681444,53.9199333 41.9375,53.1879333 41.9375,52.2858111 C41.9375,51.3823333 42.6681444,50.6523667 43.5716222,50.6523667 C44.4737444,50.6523667 45.2050667,51.3823333 45.2050667,52.2858111 C45.2050667,53.1879333 44.4737444,53.9199333 43.5716222,53.9199333 L43.5716222,53.9199333 Z M43.5716222,32.6790556 L34.8574333,32.6790556 C33.6584444,32.6790556 32.6790556,32.1876667 32.6790556,31.5898667 L32.6790556,28.3216222 C32.6790556,27.1233111 33.4971333,25.6044111 34.4988889,24.9469667 C34.4988889,24.9469667 35.9893222,23.9648667 38.1256778,23.9648667 C42.3380667,23.9648667 44.4066444,26.6082 44.4066444,26.6082 C45.1454222,27.5496333 45.75,29.3016889 45.75,30.5 C45.75,31.6976333 44.7685778,32.6790556 43.5716222,32.6790556 L43.5716222,32.6790556 Z M57.0370333,48.9443667 C56.9082556,48.9952 56.7740556,49.0175667 56.6425667,49.0175667 C56.2054,49.0175667 55.7946667,48.7539111 55.6286111,48.3242 L47.7060667,27.9739222 C45.6110556,22.7394444 43.0212667,20.6959444 38.4713444,20.6959444 C35.4532,20.6959444 32.9203444,22.5679667 32.8973,22.5883 C31.5525889,23.5961556 29.4487667,23.5914111 28.1033778,22.5883 C28.0810111,22.5679667 25.5237556,20.6959444 22.5279778,20.6959444 C17.9794111,20.6959444 15.3896222,22.7394444 13.2912222,27.9827333 L5.37206667,48.3242 C5.1545,48.8847222 4.5201,49.1626111 3.96161111,48.9443667 C3.40244444,48.7274778 3.12387778,48.0957889 3.3428,47.5332333 L11.2646667,27.1843111 C13.6945,21.1073556 17.0623778,18.5175667 22.5279778,18.5175667 C26.2659222,18.5175667 29.2840667,20.7501667 29.4101333,20.8430222 C29.9808222,21.2727333 31.0198556,21.2727333 31.5891889,20.8430222 C31.7159333,20.7501667 34.7354333,18.5175667 38.4706667,18.5175667 C43.9369444,18.5175667 47.3041444,21.1073556 49.7319444,27.1755 L57.6585556,47.5332333 C57.8754444,48.0957889 57.5989111,48.7274778 57.0370333,48.9443667 L57.0370333,48.9443667 Z" id="Shape"></path>
                  </g>
              </g>
          </g>
        </svg>
        <p class="no-results__text">Search by character name</p>
      </div>
    </div>
  </main>
</template>
<script>
  import axios from 'axios'
  import pluralize from 'pluralize'

  // enter to search
  function handleEnter (e) {
    if (e.keyCode === 13) {
      document.getElementById('search-button').click()
    }
  }
  window.addEventListener('keydown', handleEnter)

  function capitalize (value) {
    if (!value) return ''
    value = value.toString()
    value = value.charAt(0).toUpperCase() + value.slice(1)
    return value
  }
  function charAttributeFormat (value, label) {
    if (label !== 'gender') {
      value = value + ' ' + label
    }
    return capitalize(value)
  }

  export default {
    name: 'app',
    data () {
      return {
        search: '',
        genderSelect: '',
        genders: {
          male: {
            display: 'Male',
            value: 'male',
            count: 0
          },
          female: {
            display: 'Female',
            value: 'female',
            count: 0
          },
          other: {
            display: 'Other',
            value: 'n/a',
            count: 0
          }
        },
        characters: {
          all: [],
          searched: [],
          current: []
        },
        charactersCount: 0,
        charactersCountLabel: 'Results',
        errors: []
      }
    },
    created () {
      axios.get('https://swapi.co/api/people')
        .then(response => {
          this.characters.all = response.data.results
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      clearCharacters: function () {
        // Reset to the initial state
        this.characters.current = []
        this.charactersCount = 0
        for (var i in this.genders) {
          this.genders[i].count = 0
        }
      },
      countCharacters: function (current) {
        // Check the count label and change it to singluar or plural if needed
        if (pluralize.isPlural(this.charactersCountLabel) && current.length === 1) {
          this.charactersCountLabel = pluralize.singular(this.charactersCountLabel)
        } else if (pluralize.isSingular(this.charactersCountLabel) && current.length !== 1) {
          this.charactersCountLabel = pluralize.plural(this.charactersCountLabel)
        }
        // Change the count value display
        this.charactersCount = current.length
      },
      filterByGender: function (searched) {
        // Revert to the full search resluts list, or filter the current character list by gender
        if (this.genderSelect === '') {
          this.characters.current = searched
        } else {
          this.characters.current = searched.filter(
            character => character.gender === this.genderSelect
          )
        }
        return this.characters.current
      },
      listByGender: function () {
        this.filterByGender(this.characters.searched)
        this.countCharacters(this.characters.current)
      },
      listBySearch: function () {
        // Reset everything if there is no search, or filter the full character list
        if (this.search === '') {
          this.clearCharacters()
        } else {
          // Get a list of characters based on the search
          this.characters.searched = this.characters.all.filter(
            character => character.name.toLowerCase().match(this.search.toLowerCase())
          )

          // Look through the searched characters and get the number of results that are available for each gender
          for (var prop in this.genders) {
            this.genders[prop].count = this.characters.searched.filter(
              character => character.gender === this.genders[prop].value
            ).length
          }

          this.filterByGender(this.characters.searched)
          this.countCharacters(this.characters.current)
        }
      },
      checkAttribute: function (value) {
        if (value === 'n/a' || value === 'none' || value === '') {
          return false
        } else {
          return true
        }
      }
    },
    filters: {
      formatGender: function (value) {
        return charAttributeFormat(value, 'gender')
      },
      formatHair: function (value) {
        return charAttributeFormat(value, 'hair')
      },
      formatEyes: function (value) {
        return charAttributeFormat(value, 'eyes')
      },
      capitalize: function (value) {
        return capitalize(value)
      }
    }
  }
</script>
