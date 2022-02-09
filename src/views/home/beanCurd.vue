<template>
    <div class="curd">
        <div class="data">
            <div>
                <div class="value">{{value1}}</div>
                <div class="label">{{title1}}</div>
            </div>
            <div>
                <div class="value">{{value2 | cf(format)}}</div>
                <div class="label">{{title2}}</div>
            </div>
        </div>
        <div class="icon-div">
            <img class="icon" :src="url" />
        </div>
    </div>
</template>

<script>
    import logo0 from "@/assets/image/bean_curd_icon0.png"
    import logo1 from "@/assets/image/bean_curd_icon1.png"
    import logo2 from "@/assets/image/bean_curd_icon2.png"
    import logo3 from "@/assets/image/bean_curd_icon3.png"
    import logo4 from "@/assets/image/bean_curd_icon4.png"
    import { currency } from "@/utils/bohotec.com"
    export default {
        name: "beanCurd",
        props: {
            iconIndex: {required: true},
            title1: {required: true},
            value1: {required: true},
            title2: {required: true},
            value2: {required: true},
            format: {required: false, default: 1},
        },
        mounted() {
            console.log('format', this.format)
            switch (this.iconIndex) {
                case 0:
                    this.url = logo0
                    break;
                case 1:
                    this.url = logo1
                    break;
                case 2:
                    this.url = logo2
                    break;
                case 3:
                    this.url = logo3
                    break;
                default:
                    this.url = logo4
            }
        },
        data() {
            return {
                url: ''
            }
        },
        filters: {
            cf(v, f) {
                if (v && f) {
                    return currency(v, 1)
                } else {
                    return v
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.curd {
    display: flex;
    padding: 1rem;
    background-color: #ffffff;
    .data {
        width: 100%;
        position: relative;

        & > div:last-of-type {
            position: absolute;
            bottom: 0;
        }
        .value {
            font-size: 1.4rem;
            font-weight: 600;
            color: #333333;
        }
        .label {
            margin-top: .3rem;
            font-size: .8rem;
            color: #888888;
        }
    }
    .icon-div {
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .icon {
            width: 100%;
            height: 4rem;
        }
    }
}
</style>