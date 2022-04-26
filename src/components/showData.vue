<template>
    <h1>Show Data from Store</h1>
    <div class="characters">
        <div class="character" v-for="character in paginatedData" :key="character.id">
      <img :src="character.image" :alt="character.name">
      <div class="character-info">
          <h3>{{character.name}}</h3>
          <div class="status">
              <span
                :class="
                character.status == 'Alive' ? 'alive' : 
                character.status == 'Dead' ? 'dead' :
                'default'
                "
              >
              </span>
              <span>{{character.status}} - {{character.species}}</span>
          </div>
          <div class="origin">
              <span>
                  Origin: 
                  {{character.origin.name}}
              </span>
          </div>
          <div class="location">
              Location: 
                  {{character.location.name}}
          </div>
      </div>
  </div>
    </div>
    <ul class="pagination" v-if="data.length > 5 || currentPage > 1">
        <li class="pagination-item" title="title1">
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
                first
            </button>
        </li>

        <li class="pagination-item" title="title2">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
                previous
            </button>
        </li>

        <li class="pagination-item" v-for="(page, index) in pages" :key="index">
            <button 
            type="button" 
            @click="onClickPage(page.number)" 
            :disabled="page.isDisabled" 
            :class="{ active: isPageActive(page.number) }">
                {{ page.number }}
            </button>
        </li>

        <li class="pagination-item" title="title3">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
                next
            </button>
        </li>
        <li class="pagination-item" title="title4">
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
                last
            </button>
        </li>
    </ul>
</template>
<script>
//import { mapState } from 'vuex';
export default {
    name: "showData",
    props: {
        data: {
            type: Array,
            required: true
        },
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
  },
  computed: {
    paginatedData(){
      let start = (this.currentPage - 1) * this.perPage, end = start + this.perPage
      return this.data.slice(start, end)
    },
    startPage() {
      if (this.currentPage === 1) return 1
      if (this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons -1)
      return this.currentPage - 1
    },
    endPage() { return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages) },
    pages() {
      let range = []
      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage 
        });
      }
      return range
    },
    isInFirstPage() { return this.currentPage === 1 },
    isInLastPage() { return this.currentPage === this.totalPages },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);   
    },
    isPageActive(page) {
      return this.currentPage === page
    },
    
    onPageChange(page) {
      this.currentPage = page;
    }
  },
 }
</script>
<style lang="scss">
.characters{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    flex-grow: inherit;
    gap: 3rem;
    align-items: center;
    margin: 3rem 0;
}
.character {
    background-color: var(--background-card);
    border-radius: 20px;
    box-shadow: 0 0 10px 1px var(--background-body);
    overflow: hidden;
    cursor: pointer;
    transition: transform 300ms ease-in-out;
    height: 100%;
    max-height: 600px;
    &:hover{
        transform: scale(1.05);
        h3{
            color: var(--text-orange);
        }
    }
    span{
        color: var(--text-gray);
    }
    h3{
        margin-bottom: 0.5rem;
    }
    &-info{
        padding: 1.5rem;
        .status {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        span{
            color: var(--text-gray);
            &:first-child {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 0.5rem;
            }

        }
        .alive{
            background-color: green;
        }
        .dead{
            background-color: red;
        }
        .default{
            background-color: white;
        }
    }
    .origin{
        margin-bottom: 0.5rem;
    }
}
.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
.pagination{
    display: flex;
    justify-content: center;
    gap: 20px;
    list-style: none;

}

</style>