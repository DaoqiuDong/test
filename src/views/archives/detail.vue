<template>
    <div class="archive" v-if="project">
        <div class="top">
            <div class="co-name">{{project.coName}}</div>
            <div class="actions">
                <el-button class="b" @click="back">返回</el-button>
                <el-button class="e" @click="exportPdf">导出PDF</el-button>
            </div>
        </div>

        <div class="rows">
            <div class="tbar">项目信息</div>
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
                <el-col :span="4">{{project.city}}</el-col>
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
                <el-col :span="4">开标日期：</el-col>
                <el-col :span="4">{{project.bidOpenAt}}</el-col>
            </el-row>
        </div>
        <div class="rows">
            <div class="tbar">客户信息</div>
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
<!--
            <el-row>
                <el-col :span="4">经办人：</el-col>
                <el-col :span="4">{{project.coAgentName}}</el-col>
                <el-col :span="4">经办人身份证：</el-col>
                <el-col :span="4">{{project.coAgentId}}</el-col>
                <el-col :span="4">经办人证件有效期：</el-col>
                <el-col :span="4">{{project.coAgentIdStart}}至{{project.coAgentIdDue}}</el-col>
            </el-row>
-->
        </div>
        <div class="rows">
            <div class="tbar">发票信息</div>
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
                <el-col :span="20" style="width: auto;">{{project.coAddress}}</el-col>
            </el-row>
        </div>
        <div class="rows">
            <div class="tbar">项目资料</div>
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
                        <img class="sid-img bl" :src="getUrl('BL')" @click="downloadImg('BL')"/>
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
    </div>
</template>

<script>
    import {mine} from "@/utils/dict"
    import { getFileList, getGuaranteeLetter, getPdf, getPdf2, getGL, archivedPdf } from '@/api/project'
    export default {
        name: "ArchiveDetail",
        data() {
            return {
                fileKeyMap: {
                    id3: 'A008',
                    BL: 'A001',
                    AUTH: 'LZ01',
                },
                statusList: undefined,
                project: undefined,
                files: undefined,
                gl: undefined,
                pdfs: {
                    APP: undefined,
                    AUTH: undefined,
                    BID: undefined,
                },
            }
        },
        created() {
            mine("PROJECT_STATUS").then(res => {
                this.statusList = res
            })
        },
        methods: {
            init(it) {
                console.log('receive ', it)
                this.project = it
                this.loadFiles()
                getGuaranteeLetter(this.project.id).then(res => {
                    console.log('getGuaranteeLetter', res)
                    this.guaranteeLetter = res.data

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
                this.$emit('exit')
            },
            exportPdf() {
                // window.open(`/api/archive/glpdf/${this.project.id}`)
                archivedPdf(this.project.id).then(res => {
                    console.log(res)
                    if (res) {
                        window.open(`/archivefile/${res}`)
                    }
                })
            },
            statusFormat(project) {
                return this.selectDictLabel(this.statusList, project.status);
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
.archive {
    margin: 1rem 0 3rem;
    padding: 1rem 2rem;
    background-color: #ffffff;
    .tbar {
        margin: 2rem 0;
        padding: .75rem 1rem;
        font-size: 1.1rem;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        color: #333333;
        background-color: #F8F8FA;
    }
    .tbar:before {
        margin-right: .5rem;
        content: '.';
        color: #027FFE;
        background-color: #027FFE;
    }
  .top {
      position: relative;
      .co-name {
          margin: 1rem 0;
          text-align: center;
          line-height: 2rem;
          font-size: 1.3rem;
          font-weight: bold;
          color: #333333;
      }
      .actions {
          position: absolute;
          right: 0;
          top: 0;
          .b, .e {
              width: 6rem;
          }
          .b {
              color: #ffffff;
              background-color: #0078D5;
          }
          .e {
              color: #ffffff;
              background-color: #0ABC3C;
          }

      }
  }
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
                    height: 150rem;
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
                    margin: 1rem;
                    padding: 1rem;
                    background-color: #ffffff;
                    .sid-img.bl {
                        height: 30rem;
                    }
                    .sid-img, .id-img {
                        height: 17rem;
                    }
                    .id-img:last-of-type {
                        margin-left: 1rem;
                    }
                    .pdf {
                        height: 70rem;
                    }
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
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
</style>