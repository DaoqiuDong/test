<template>
    <div v-if="project" class="status-line">
        <div class="status-info">
            <div class="sit">
                <div class="sitr">
                    <div class="sitr-num">{{project.bidNo}}</div>
                    <div class="sitr-name"></div>
                    <div class="sitr-status">{{statusFormat(project)}}</div>
                </div>
            </div>
            <div class="sif">
                <div class="sifl">
                    <div>申请时间</div>
                    <div>{{project.createdAt | cut}}</div>
                </div>
                <div class="sifr">
                    <div>保证金金额</div>
                    <div>{{project.guaranteeAmount }}</div>
                </div>
            </div>
        </div>
        <div class="status-list">
            <div :class="stepNum"></div>
            <div class="node-dates">
                <div class="node-date" v-for="i of dates">{{i}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mine} from "@/utils/dict"
    export default {
        name: "project_status",
        data() {
            return {
                project: undefined,
                statusList:[],
                stepNum: '',
                dates: []
            }
        },
        methods: {
            init(project) {
                mine("PROJECT_STATUS").then(res => {
                    this.statusList = res
                })
                this.project = project
                this.stepNum = `status-diagram${project.stepNum}`
                this.dates = [
                    this.project.createdAt,
                    this.project.approvedAt,
                    this.project.payAt,
                    this.project.guaranteeAt,
                    `${this.project.bidOpenAt} 00:00:00`,
                ]
            },
            statusFormat(project) {
                return this.selectDictLabel(this.statusList, project.status);
            },
        },
        filters: {
            cut(v) {
                return v ? v.replace(/^([\d-]+) .*$/, '$1') : v
            }
        }
    }
</script>

<style lang="scss" scoped>
    .status-line {
        display: flex;
        margin-bottom: 2rem;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        -webkit-box-shadow: 0 0 3px #cccccc;
        -moz-box-shadow: 0 0 3px #cccccc;
        box-shadow: 0 0 3px #cccccc;

        & .status-list {
            width: calc(100% - 29rem);
            margin: 3rem 0 0 2rem;

            .status-diagram-1, .status-diagram0, .status-diagram1, .status-diagram2, .status-diagram3, .status-diagram4, .status-diagram5, .status-diagram6, .status-diagram7 {
                height: 8rem;
                margin: 0 2rem;
                background-size: 100% 100%;
            }
            .status-diagram0, .status-diagram-1 {
                background-image: url("../../assets/image/gl_status-1.png");
            }
            .status-diagram1 {
                background-image: url("../../assets/image/gl_status1.png");
            }
            .status-diagram2 {
                background-image: url("../../assets/image/gl_status2.png");
            }
            .status-diagram4 {
                background-image: url("../../assets/image/gl_status3.png");
            }
            .status-diagram5, .status-diagram6, .status-diagram7 {
                background-image: url("../../assets/image/gl_status4.png");
            }
            .node-dates {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 1rem 0;
                font-size: .9rem;

                .node-date {
                    width: 9.5rem;
                    padding: .5rem 0;
                    border-radius: 10px;
                    text-align: center;
                    color: #278EF8;
                    background: #ECF5FE;
                }
            }
        }
        & .status-info {
            width: 25rem;
            height: 16rem;
            color: #fff;
            margin: 0;
            background-image: url("../../assets/image/gl_list_icon.png");
            background-size: 100% 100%;

            .sit {
                display: inline-flex;
                width: 100%;
                height: 11rem;
                padding: 2rem 0 0 8.5rem;

                .sitr {
                    margin-right: .5rem;
                    .sitr-num {
                        color: #FFF000;
                        font-size: 1.5rem;
                        /*margin-bottom: .5rem;*/
                    }
                    .sitr-name {
                        margin: .2rem 0 .5rem;
                        font-size: 1rem;
                        font-weight: 500;
                    }
                }
            }
            .sif {
                width: 100%;
                display: flex;
                white-space: nowrap;
                text-align: center;
                font-size: 1.2rem;
                padding-top: .5rem;

                .sifl, .sifr {
                    width: 50%;

                    & > div {
                        margin-bottom: .5rem;
                    }

                    & > div:last-of-type,
                    & > div:last-of-type {
                        font-weight: 500;
                    }
                }
            }
        }
    }
</style>
