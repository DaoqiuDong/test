<template>
    <div class="project" v-if="project">
        <div class="project-title">
            <div class="back-button">
                <el-button type="warning" icon="el-icon-back" @click="back">返回</el-button>
            </div>
        </div>
        <div v-if="project" class="project-data">
            <project_status ref="statusView"></project_status>
            <div class="rows">
                <div class="title-container">项目信息</div>
                <el-row>
                    <el-col :span="4">项目编号：</el-col>
                    <el-col :span="4">{{project.bidNo}}</el-col>
                    <el-col :span="4">标段编号：</el-col>
                    <el-col :span="4">{{project.bidSectorNum}}</el-col>
                    <el-col :span="4">标段名称：</el-col>
                    <el-col :span="4">{{project.bidSectorName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">投标信息发布平台：</el-col>
                    <el-col :span="4">{{project.platformName}}</el-col>
                    <el-col :span="4">招标人：</el-col>
                    <el-col :span="4">{{project.tenderee}}</el-col>
                    <el-col :span="4">项目归属地：</el-col>
                    <el-col :span="4">{{project.city }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">保证金金额(元)：</el-col>
                    <el-col :span="4">{{project.guaranteeAmount | currency }}</el-col>
                    <el-col :span="4">手续费(元)：</el-col>
                    <el-col :span="4">{{project.feeAmount }}</el-col>
                    <el-col :span="4">项目状态：</el-col>
                    <el-col :span="4">{{statusFormat(project)}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">投标截止时间：</el-col>
                    <el-col :span="4">{{project.biddingDeadline}}</el-col>
                    <el-col :span="4">开标时间：</el-col>
                    <el-col :span="4">{{project.bidOpenAt}}</el-col>
                </el-row>
            </div>
            <div class="rows">
                <div class="title-container">客户信息</div>
                <el-row>
                    <el-col :span="4">企业名称：</el-col>
                    <el-col :span="4">{{project.coName}}</el-col>
                    <el-col :span="4">统一社会信用代码：</el-col>
                    <el-col :span="4">{{project.coCreditId}}</el-col>
                    <el-col :span="4">法人代表：</el-col>
                    <el-col :span="4">{{project.coLegalName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">法人身份证：</el-col>
                    <el-col :span="4">{{project.coLegalId}}</el-col>
                    <el-col :span="4">联系电话：</el-col>
                    <el-col :span="4">{{project.contactPhone}}</el-col>
                    <el-col :span="4">电子邮箱：</el-col>
                    <el-col :span="4">{{project.coEmail}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">成立日期：</el-col>
                    <el-col :span="4">{{project.coRegDate}}</el-col>
                    <el-col :span="4">营业执照有效期：</el-col>
                    <el-col :span="4">{{project.coRegDate}}至{{project.coRegDue}}</el-col>
                    <el-col :span="4">投标代理：</el-col>
                    <el-col :span="4">{{project.bidAgency}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">从业人数：</el-col>
                    <el-col :span="4">{{project.employeeNum}}</el-col>
                    <el-col :span="4">营业收入(万)：</el-col>
                    <el-col :span="4">{{project.income}}</el-col>
                    <el-col :span="4">资产总额(万)：</el-col>
                    <el-col :span="4">{{project.assets}}</el-col>
                </el-row>
            </div>
            <div class="rows">
                <div class="title-container">发票信息</div>
                <el-row>
                    <el-col :span="4">基本户开户行：</el-col>
                    <el-col :span="4">{{project.coBank ? project.coBank : '-'}}</el-col>
                    <el-col :span="4">基本户账号：</el-col>
                    <el-col :span="4">{{project.coBasicAcct ? project.coBasicAcct : '-'}}</el-col>
                    <el-col :span="4">纳税人性质：</el-col>
                    <el-col :span="4">{{project.payTaxType | payTaxTypeFilte }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">发票类型：</el-col>
                    <el-col :span="4"> {{'1' === project.invoiceType ? '增值税专用发票' : '0' === project.invoiceType ? '增值税普通发票' : '-'}}</el-col>
                    <el-col :span="4">申请时间：</el-col>
                    <el-col :span="4">{{project.createdAt}}</el-col>
                    <el-col :span="4">公司电话：</el-col>
                    <el-col :span="4">{{project.coTelNo}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">公司地址：</el-col>
                    <el-col :span="16" style="width: auto;">{{project.coAddress}}</el-col>
                </el-row>
            </div>
            <div class="rows">
                <div class="title-container">处理流程</div>
                <history ref="history" class="history"></history>
            </div>
            <div class="rows">
                <div class="title-container">项目资料</div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">法人身份证：</div>
                    <div class="v">
                        <div class="imgs">
                            <img class="id-img" :src="getUrl('id-3')" @click="downloadImg('id-3')"/>
                            <img class="id-img" :src="getUrl('id-4')" @click="downloadImg('id-4')"/>
                        </div>
                        <div class="text">
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">姓名：</div>
                                <div class="ocrv">{{project.coLegalName}}</div>
                            </div>
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">身份证号：</div>
                                <div class="ocrv">{{project.coLegalId}}</div>
                            </div>
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">有效期：</div>
                                <div class="ocrv">{{project.coLegalIdStart}} - {{project.coLegalIdDue}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">经办人身份证：</div>
                    <div class="v">
                        <div class="imgs">
                            <img class="id-img" :src="getUrl('id-1')" @click="downloadImg('id-1')"/>
                            <img class="id-img" :src="getUrl('id-2')" @click="downloadImg('id-2')"/>
                        </div>
                        <div class="text">
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">姓名：</div>
                                <div class="ocrv">{{project.coAgentName}}</div>
                            </div>
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">身份证号：</div>
                                <div class="ocrv">{{project.coAgentId}}</div>
                            </div>
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">有效期：</div>
                                <div class="ocrv">{{project.coAgentIdStart}} - {{project.coAgentIdDue}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">企业营业执照：</div>
                    <div class="v">
                        <div class="imgs">
                            <img class="sid-img" :src="getUrl('BL')" @click="downloadImg('BL')"/>
                        </div>
                        <div class="text">
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">企业名称：</div>
                                <div class="ocrv">{{project.coName}}</div>
                            </div>
                            <div class="tr">
                                <el-icon class="el-icon-success" ></el-icon>
                                <div class="ocrt">统一社会信用代码：</div>
                                <div class="ocrv">{{project.coCreditId}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">授权委托书：</div>
                    <div class="v">
                        <div class="imgs">
                            <img v-if="pdfs.AUTH" class="pdf" :src="pdfs.AUTH" @click="download('AUTH')" />
                        </div>
                        <div class="text">&nbsp;</div>
                    </div>
                </div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">保函申请书：</div>
                    <div class="v">
                        <div class="imgs">
                            <img v-if="pdfs.APP" class="pdf" :src="pdfs.APP" @click="download('APP')" />
                        </div>
                        <div class="text">&nbsp;</div>
                    </div>
                </div>
                <div class="r" v-if="'EBGR' === project.reqSource">
                    <div class="t">招标文件：</div>
                    <div class="v">
                        <div class="imgs">
                            <img v-if="pdfs.BID" class="pdf" :src="pdfs.BID" @click="download('BID')" />
                        </div>
                        <div class="text">&nbsp;</div>
                    </div>
                </div>
                <div class="r" v-if="'PG' === project.status || 'CL' === project.status">
                    <div class="t">保函文件：</div>
                    <div class="v">
                        <div class="imgs">
                            <img class="pdf" :src="gl" @click="download('GL')" />
                        </div>
                        <div class="text">&nbsp;</div>
                    </div>
                </div>
            </div>
            <div class="rows" v-if="hasRole && 'PA' === project.status" >
                <div class="title-container">审批意见</div>
                <el-form ref="form1" :model="form" :rules="rules">
                    <el-form-item prop="motivation">
                        <el-input type="textarea" rows="5" v-model="form.motivation" ></el-input>
                    </el-form-item>
                    <el-form-item class="actions">
                        <el-button class="btn-r" :disabled="loading" round @click="submit_approval('R')">退 回</el-button>
                        <el-button class="btn-a" :disabled="loading" round @click="submit_approval('A')">同 意</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="el-form" v-else>
                <div class="actions">
                    <el-button class="btn-r" @click="back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {approval, getFileList, getGuaranteeLetter, getPdf, getPdf2, getGL} from '@/api/project'
    import {mine} from "@/utils/dict"
    import History from "./history"
    import Project_status from "./project_status"
    import { mine as mineUser } from "@/api/system/user"

    export default {
        name: "Approval",
        components: {Project_status, History},
        data() {
            return {
                fileKeyMap: {
                    id3: 'A008',
                    BL: 'A001',
                    AUTH: 'LZ01',
                },
                loading: false,
                // showApprovalDialog: false,
                showHistory: false,
                showInvestigationDialog: false,
                project: undefined,
                guaranteeLetter: undefined,
                payment: undefined,
                branches: [],
                step: 0,
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    branchId: undefined,
                },
                pdfs: {
                    APP: undefined,
                    AUTH: undefined,
                    BID: undefined,
                },
                hasRole: false,
                gl: undefined,
                files: [],
                statusList:[],
                form: {
                    motivation: '',
                    approved: undefined,
                },
                rules: {
                    motivation: [{ max: 128, message: '请控制长度在 128 个字符以内', trigger: 'blur'}]
                }
                // files2: [],
            }
        },
        created() {
            mineUser().then(res => {
                if (res.roles && 0 < res.roles.length) {
                    console.log(res.roles)
                    this.hasRole = res.roles.find(i => i === 'role_a')
                }
            })
        },
        methods: {
            init(data) {
                mine("PROJECT_STATUS").then(res => {
                    this.statusList = res
                })
                this.project = data
                if (this.project) {
                    this.$nextTick(_ => {
                         this.$refs.statusView.init(this.project)
                    })
                }
                this.loadFiles()
                getGuaranteeLetter(this.project.id).then(res => {
                    console.log('getGuaranteeLetter', res)
                    this.guaranteeLetter = res.data
                    this.$refs.history.init(this.project.processInstanceId)

                    console.log(this.guaranteeLetter.fileName);
                    if (this.guaranteeLetter && this.guaranteeLetter.fileName) {
                        console.log('getGL')
                        getGL(this.guaranteeLetter.fileName).then(res => {
                            this.gl = res.data
                            console.log('GL done')
                        }).error(e => {console.log(e)})
                    }
                })

            },
            back() {
                this.$emit('close')
            },
            statusFormat(project) {
                return this.selectDictLabel(this.statusList, project.status);
            },
            submit_approval(approved) {
                this.loading = true
                this.form.approved = approved
                if ('R' === approved) {
                    this.rules.motivation = [{required: true, message: '请填写退回原因', trigger: 'blur'}, { max: 128, message: '请控制长度在 128 个字符以内', trigger: 'blur'}]
                } else {
                    this.rules.motivation = [{ max: 128, message: '请控制长度在 128 个字符以内', trigger: 'blur'}]
                }
                this.$refs.form1.validate(valid => {
                    if (valid) {
                        approval({... this.form, projectId: this.project.id,
                            requestId: this.project.requestId,
                            applyId: this.project.applyId}).then(res => {
                            console.log(res)
                            this.msgSuccess('审批操作成功')
                            this.$emit('exit')
                        })
                    } else {
                        this.loading = false
                    }
                })
            },
            download(k) {
                console.log(k)
                if (('GL' === k) && this.guaranteeLetter && this.guaranteeLetter.fileName) {
                    window.open(`/gl/cfca_sign/${this.guaranteeLetter.fileName}`)
                } else {
                    if ('EBGR' === this.project.reqSource) {
                        const f = this.files.find(f => f.fileCode === k)
                        if (f) {
                            window.open(`/projectfile/${f.fileGuid}/${f.fileName}`)
                        }
                    } else {
                        const rk = this.fileKeyMap[k]
                        if (rk) {
                            const f = this.files.find(f => f.fileCode === rk)
                            if (f && f.fileSuffix) {
                                window.open(`/gswr/${this.project.applyId}/${rk}.${f.fileSuffix}`)
                            }
                        }
                    }
                }
            },
            downloadImg(k) {
                const u = this.getUrl(k)
                if (u) {
                    window.open(`${u}`)
                }
            },
            loadFiles() {
                getFileList(this.project.id, this.project.requestId, this.project.applyId).then(res => {
                    // console.log(res)
                    if (res && "200" === res.code) {
                        this.files = res.data
                    }
                    if (this.files) {
                        for (let k of Object.keys(this.pdfs)) {
                            // console.log('key ', k)
                            if ('EBGR' === this.project.reqSource) {
                                const f = this.files.find(f => f.fileCode === k)
                                // console.log(f)
                                if (f && f.fileGuid) {
                                    getPdf(f.fileGuid, f.fileName).then(res => {
                                        console.log(res)
                                        if (res && "200" === res.code) {
                                            this.pdfs[k] = res.data
                                        }
                                    })
                                }
                            } else {
                                const rk = this.fileKeyMap[k]
                                // console.log(k, rk)
                                if (rk) {
                                    const f = this.files.find(f => f.fileCode === rk)
                                    // console.log(f)
                                    if (f && f.fileSuffix) {
                                        getPdf2(this.project.applyId, `${rk}.${f.fileSuffix}`).then(res => {
                                            this.pdfs[k] = res.data
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
            },
            getUrl(k) {
                if (this.files) {
                    if ('EBGR' === this.project.reqSource) {
                        const f = this.files.find(f => f.fileCode === k)
                        if (f) {
                            return `/projectfile/${f.fileGuid}/${f.fileName}`
                        }
                    } else {
                        // console.log(k, k.replace('-', ''))
                        const rk = this.fileKeyMap[k.replace('-', '')]
                        console.log(k, rk)
                        if (rk) {
                            const f = this.files.find(f => f.fileCode === rk)
                            if (f) {
                                return `/${this.project.reqSource.toLowerCase()}/${this.project.applyId}/${f.fileCode}.${f.fileSuffix}`
                            }
                        }
                    }
                }
                return undefined
            },
        },
        filters: {
            payTaxTypeFilte(v) {
                console.log('payTaxTypeFilte', v)
                const c = {
                    'k01': '小规模纳税人',
                    'k02': '一般纳税人'
                };
                return c[`k${v}`]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .project {
        min-width: 65rem;
        margin-bottom: 3rem;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        .project-data {
            min-width: 78rem;
            background-color: #ffffff;
            margin: 0 .5rem;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            -webkit-box-shadow: 1px 5px 15px 0 #cccccc;
            -moz-box-shadow: 1px 5px 15px 0 #cccccc;
            box-shadow: 1px 5px 15px 0 #cccccc;
            .rows {
                color: #333333;
                font-size: 1.1rem;
                /*padding: 0 3rem;*/
                .el-row {
                    padding: 0 3rem;
                    .el-col {
                        width: calc((100% - 36rem) / 3);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        padding: .5rem;
                    }
                    .el-col:nth-child(odd) {
                        width: 12rem;
                        background: #F8F8FA;
                        text-align: right;
                    }
                }
                .el-row.row {
                    display: flex;

                    .image-box {
                        height: 14rem;
                        min-height: 14rem;
                        display: flex;
                        justify-content: space-evenly;
                        margin-right: .5rem;
                        padding: 3rem 1rem;
                        border: 1px solid #cccccc;

                        & > .id-img {
                            width: 40%;
                            max-height: 10rem;
                        }
                    }
                    .before-pdf {
                        height: 100%;
                    }
                    .image-box-pdf {
                        height: 22rem;
                        padding: .5rem;
                        margin-right: .5rem;
                        border: 1px solid #cccccc;
                        text-align: center;

                        .pdf {
                            height: 20rem;
                            border: 1px solid #cccccc55;
                        }
                    }
                }
                .history {
                    margin: 1rem 2rem;
                }
                .r {
                    display: flex;
                    /*flex-direction: revert;*/
                    margin: 1rem 4rem;
                    background-color: #D4D8DE;
                    .t,.v {
                        background-color: #F0F4FA;
                    }
                    .t {
                        width: 12rem;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        text-align: end;
                        padding-right: 1rem;
                        font-size: 1.2rem;
                        color: #333333;
                    }
                    .v {
                        width: calc(100% - 12rem);
                        display: flex;
                        margin-left: 1px;
                        .imgs {
                            display: flex;
                            flex-direction: row;
                            margin: 2rem;
                            padding: 1rem;
                            background-color: #ffffff;
                            .pdf, .sid-img, .id-img {
                                height: 10rem;
                                /*margin: 1rem 0;*/
                                /*padding: 1rem;*/
                            }
                            .id-img:last-of-type {
                                margin-left: 1rem;
                            }
                        }
                        .text {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            /*width: 100%;*/
                            /*height: 100%;*/
                            /*background-color: #6379bb;*/
                            .tr {
                                display: flex;
                                flex-direction: row;
                                padding: .5rem;
                                .el-icon-success {
                                    color: #00CDA9;
                                }
                                .ocrt {
                                    margin-left: .5rem;
                                    color: #333333;
                                }
                                .ocrv {
                                    color: #9BA5AD;
                                }
                            }
                        }
                    }
                }
            }
        }
        .el-form {
            margin: 0 2rem;
            .actions {
                text-align: center;
                padding-bottom: 1rem;

                .btn-a, .btn-r {
                    width: 8rem;
                    margin: 1rem;
                }
                .btn-r {
                    background-color: #EBEBEB;
                }
                .btn-a {
                    color: #ffffff;
                    background-color: #0ABC3C;
                }
            }
        }
    }
    .project-title {
        display: flex;
        margin: 1rem 0 .5rem;
/*
        .back-button {
            margin-top: 0.5rem;
        }
*/
    }

    .company-name {
        width: 100%;
        top: 2rem;
        position: absolute;
        text-align: center;
        z-index: -1;
    }

    .file-list td > div {
        margin: .5rem 0;
    }

    .no-data {
        width: 100%;
        text-align: center;
        color: #777777;
    }
</style>
