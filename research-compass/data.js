window.RESEARCH_DATA = {
  "groups": [
    {
      "country": "芬兰",
      "name": "奥卢大学 Biophotonics",
      "people": "Aliaksandr Bykau／Alexander Bykov",
      "level": "光学拓展优先",
      "tags": "光传输  Monte Carlo  PPG",
      "official": "https://www.oulu.fi/en/research-groups/biophotonics",
      "context": "适合把已有血流与血管壁运动模型接到组织光学观测。该组的重点包括组织光学、计算建模与生物光子学实验；这里采用当前官网列出的负责人，而不把历史合作者自动当作现任导师。",
      "papers": [
        {
          "title": "Influence of blood pulsation on diagnostic volume in pulse oximetry and photoplethysmography measurements",
          "year": "2019",
          "venue": "Applied Optics 58 9398–9405",
          "url": "https://doi.org/10.1364/AO.58.009398",
          "problem": "PPG或血氧测量中的光究竟采样了哪些组织，采样区域是否会随脉动和波长变化？",
          "method": "用统一的Monte Carlo模型模拟手指透射和反射测量，改变动脉血容量，比较可见光与近红外波段的诊断体积。",
          "evidence": "数值结果显示，脉动引起的采样体积变化具有波长和测量几何依赖性，支持绝对量测量需要进行相应归一化。",
          "limit": "属于前向仿真证据，并未验证从PPG唯一反演AVF狭窄程度，也没有完成你的FSI到光学端到端链条。",
          "ref": "P01"
        }
      ],
      "transfer": "可提出血流／壁运动到多波长PPG的分阶段耦合，先检验血容量、组织厚度和接触压力的可辨识性，再考虑生成训练数据。",
      "id": "G01"
    },
    {
      "country": "芬兰",
      "name": "奥卢大学 Myllylä Group",
      "people": "Teemu Myllylä",
      "level": "光学拓展优先",
      "tags": "NIRS  DCS  多模态生理监测",
      "official": "https://www.oulu.fi/en/research-groups/myllyla-group",
      "context": "更偏向光学传感器、人体测量与生理解释。官网涵盖NIRS、DCS等技术；下述具体论文使用fNIRS，不能据此把它说成DCS验证。",
      "papers": [
        {
          "title": "Cerebral tissue oxygenation response to brain irradiation measured during clinical radiotherapy",
          "year": "2023",
          "venue": "Journal of Biomedical Optics 28 015002",
          "url": "https://doi.org/10.1117/1.JBO.28.1.015002",
          "problem": "能否在实际放疗过程中连续观测脑组织氧合和血流动力学的即时变化？",
          "method": "在临床照射期间使用近红外光谱，分析氧合／脱氧血红蛋白和组织氧合指数的时间响应。",
          "evidence": "报告34次受试者测量，呈现照射期间及照射后的光学生理响应；这里的34是测量次数，不应直接当作独立患者数。",
          "limit": "研究场景是脑放疗，目标并非AVF狭窄；血红蛋白变化与宏观血流速度不是同一个量，还需要处理浅层组织及系统生理混杂。",
          "ref": "P02"
        }
      ],
      "transfer": "适合学习光学硬件、实验同步与临床数据采集。你能贡献物理模型和抗噪算法，需补充光路、组织光学及人体实验设计。",
      "id": "G02"
    },
    {
      "country": "芬兰",
      "name": "东芬兰大学 Optical Imaging 与逆问题团队",
      "people": "Tanja Tarvainen",
      "level": "光学与物理AI优先",
      "tags": "光声  光传输  定量反演",
      "official": "https://sites.uef.fi/inverse/research-areas/optical-imaging/",
      "context": "适合从信号分类转向有前向模型约束的定量反演。光声成像同时涉及光与声，但其声源来自光吸收后的热弹性过程，区别于你的流致声源。",
      "papers": [
        {
          "title": "Quantitative photoacoustic tomography: modeling and inverse problems",
          "year": "2023在线／2024卷期",
          "venue": "Journal of Biomedical Optics 29 S11509 综述",
          "url": "https://doi.org/10.1117/1.JBO.29.S1.S11509",
          "problem": "为什么重建出光声图像后，仍不能直接得到可靠的吸收系数或组织氧合？",
          "method": "梳理声学反演与光学反演两个阶段，以及光传播模型、参数不确定性和不完备测量的影响。",
          "evidence": "提供数学与方法综述，强调局部光通量与吸收相互依赖，定量估计存在额外逆问题。",
          "limit": "这是一篇综述，不是新系统临床性能试验；不能当作已完成定量血氧转化的证据。",
          "ref": "P03"
        },
        {
          "title": "Utilising a learned forward operator in the inverse problem of photoacoustic tomography",
          "year": "2026",
          "venue": "arXiv预印本",
          "url": "https://arxiv.org/abs/2603.21655",
          "problem": "高精度声传播算子反复参与优化，计算成本较高。",
          "method": "学习前向传播算子，并将其与自动微分结合用于光声逆问题。",
          "evidence": "以数值实验比较学习算子与传统数值传播路线。",
          "limit": "预印本；这里没有把数值实验扩展为临床有效性或真实可穿戴部署结论。",
          "ref": "P04"
        }
      ],
      "transfer": "可延伸为带模型误差补偿的生理参数反演。申请时宜突出你对前向模型的理解，而不仅是会训练分类网络。",
      "id": "G03"
    },
    {
      "country": "芬兰",
      "name": "奥卢大学 Computational Mathematics",
      "people": "Andreas Hauptmann",
      "level": "物理AI优先",
      "tags": "算子学习  模型误差  逆问题",
      "official": "https://www.oulu.fi/en/researchers/andreas-hauptmann",
      "context": "重点是学习方法与逆问题的结合，适合深化sim-to-real的数学基础，与UEF等团队存在合作。两所机构及团队分别列出，但共享论文不重复当成独立证据。",
      "papers": [
        {
          "title": "On Learned Operator Correction in Inverse Problems",
          "year": "2021",
          "venue": "SIAM Journal on Imaging Sciences 14 92–127",
          "url": "https://doi.org/10.1137/20M1338460",
          "problem": "当计算中使用的简化前向模型偏离真实测量物理时，如何避免反演出现系统偏差？",
          "method": "学习前向与伴随算子的修正，把模型误差补偿嵌入迭代反演，并讨论相应理论条件。",
          "evidence": "以光声相关逆问题进行数值评估，比较模型误差处理方案。",
          "limit": "算子修正不等于任意域差异均可消除；训练误差分布、可辨识性和测量覆盖仍约束泛化。",
          "ref": "P05"
        }
      ],
      "transfer": "你的2D与3D差异、仿体与人体差异，可先拆成几何、边界条件和传感器响应误差，再判断适合算子修正还是特征域适配。",
      "id": "G04"
    },
    {
      "country": "芬兰",
      "name": "坦佩雷大学 Sensor Technology and Biomeasurements",
      "people": "Antti Vehkaoja",
      "level": "已有工作延续优先",
      "tags": "可穿戴  参考通道  运动伪影",
      "official": "https://research.tuni.fi/stb/contact/",
      "context": "与你的额外噪声通道、可穿戴实现和生理信号算法很接近。下述方法属于参考信号辅助处理，不是已经提出了你设想的噪声不变表示学习。",
      "papers": [
        {
          "title": "The use of wrist EMG increases the PPG Heart Rate accuracy in smartwatches",
          "year": "2022",
          "venue": "IEEE Sensors Journal 22 24197–24204",
          "url": "https://doi.org/10.1109/JSEN.2022.3219297",
          "problem": "某些手腕肌肉活动会污染PPG，但加速度通道不足以完整反映这种伪影。",
          "method": "增加腕部肌电EMG，与加速度一起定位伪影，并使用谱减等处理改善PPG心率估计。",
          "evidence": "9名受试者的动作实验中，平均心率误差较仅使用加速度参考的方案下降约49%。",
          "limit": "小样本、指定动作下的心率估计证据；并非所有受试者都显著改善，也不是狭窄分类或临床诊断验证。",
          "ref": "P06"
        }
      ],
      "transfer": "可直接借鉴额外通道提供何种干扰信息的实验设计；比较参考通道输入、随机打乱参考和移除参考，验证它对诊断任务的真实贡献。",
      "id": "G05"
    },
    {
      "country": "芬兰",
      "name": "图尔库大学 Health Technology相关团队",
      "people": "Tero Koivisto／Mikko Pänkäälä／Matti Kaisti",
      "level": "已有工作延续优先",
      "tags": "多传感器融合  心机械信号  移动检测",
      "official": "https://research.utu.fi/converis/portal/detail/Person/790094?lang=en_US",
      "context": "面向移动与可穿戴健康测量。这里按合作团队列出联系人；不把Tero Koivisto的项目管理岗位误写为教授或独立课题组PI。",
      "papers": [
        {
          "title": "End-to-end sensor fusion and classification of atrial fibrillation using deep neural networks and smartphone mechanocardiography",
          "year": "2022",
          "venue": "Physiological Measurement 43",
          "url": "https://doi.org/10.1088/1361-6579/ac66ba",
          "problem": "手机记录的多轴心脏机械振动如何有效融合，并区分房颤、窦律与噪声？",
          "method": "融合三轴加速度和三轴角速度，采用注意力、残差网络与双向循环网络进行端到端分类。",
          "evidence": "研究包含300名患者、728次测量；论文报告测量层面的较高分类表现。",
          "limit": "不能仅凭摘要假定严格患者独立划分；它也未证明你的非同步公开数据能够用于同步多位置融合。",
          "ref": "P07"
        }
      ],
      "transfer": "适合延续第三项研究。优先学习同步采集、融合策略与患者级评估，端侧可用性还应实测延迟、内存和功耗。",
      "id": "G06"
    },
    {
      "country": "芬兰",
      "name": "阿尔托大学 Sensor Informatics",
      "people": "Simo Särkkä",
      "level": "方法深化方向",
      "tags": "贝叶斯滤波  动态系统  概率数值计算",
      "official": "https://users.aalto.fi/~ssarkka/",
      "context": "适合将生理动力学模型、测量噪声与状态估计结合。与具体血管传感器的距离较远，更偏方法和数学。",
      "papers": [
        {
          "title": "Parallel-in-Time Probabilistic Numerical ODE Solvers",
          "year": "2024",
          "venue": "Journal of Machine Learning Research 25 1–27",
          "url": "https://www.jmlr.org/papers/v25/23-1261.html",
          "problem": "ODE的顺序时间积分限制并行计算，同时传统求解常只给出单一数值轨迹。",
          "method": "将求解表述为概率状态估计，用迭代扩展Kalman平滑等方法实现时间并行。",
          "evidence": "数值实验验证求解与并行性能；改善的是并行关键路径复杂度，不能概括为总计算量必然呈对数增长。",
          "limit": "数值离散误差的不确定性不等于患者差异、测量噪声或生理模型结构误差均已处理。",
          "ref": "P08"
        }
      ],
      "transfer": "适合以0D／1D循环模型开展数据同化与参数估计。若主要目标是搭建可穿戴硬件，应寻找实验合作者共同支持。",
      "id": "G07"
    },
    {
      "country": "芬兰",
      "name": "阿尔托大学 MEDUSA",
      "people": "Heikki Nieminen",
      "level": "相邻感知方向",
      "tags": "超声  微弱位移  非接触监测",
      "official": "https://www.aalto.fi/en/department-of-neuroscience-and-biomedical-engineering/medical-ultrasonics-laboratory-medusa",
      "context": "主要研究医学超声及相关器件。与被动血管声学并不相同，但具有微弱机械信号测量和硬件方法接口。",
      "papers": [
        {
          "title": "Accuracy and robustness of an air-ultrasound method for non-contact heart rate and heart rate variability measurements",
          "year": "2025",
          "venue": "Journal of the Acoustical Society of America 158 2979–2994",
          "url": "https://doi.org/10.1121/10.0039555",
          "problem": "能否用空气超声检测皮肤的微小心搏运动，并在呼吸干扰下估计心率及心率变异性？",
          "method": "在约0.5米距离进行非接触测量，引入呼吸相位信息优化心搏间期估计。",
          "evidence": "以ECG作参考，在4名年轻男性的实验中检验精度与稳健性。",
          "limit": "样本很小，不能推出对一般人群或复杂活动场景有效；主动超声测位移不同于AVF被动杂音检测。",
          "ref": "P09"
        }
      ],
      "transfer": "适合探索声学与机械位移的联合测量。若明确转向光学，应优先考虑奥卢或林雪平的对应实验团队。",
      "id": "G08"
    },
    {
      "country": "芬兰",
      "name": "赫尔辛基大学 Ultrasound与机器学习合作方向",
      "people": "Ari Salmi／Arto Klami",
      "level": "仿真学习相邻方向",
      "tags": "物理模拟  合成数据  超声反演",
      "official": "https://researchportal.helsinki.fi/en/persons/ari-salmi/",
      "context": "属于超声实验与机器学习合作接口，研究对象可能是工业检测。方法可以迁移，但不是既有AVF或心血管可穿戴课题组。",
      "papers": [
        {
          "title": "Self-adaptation of ultrasound sensing networks",
          "year": "2025",
          "venue": "Mechanical Systems and Signal Processing 224 112214",
          "url": "https://doi.org/10.1016/j.ymssp.2024.112214",
          "problem": "分布式超声系统中的传感器位置、材料参数和耦合状态不准确或随时间变化，会使反演结果偏离真实状态。",
          "method": "将实测信号特征与物理前向仿真对齐，自动估计相关参数，并根据观测更新模型。",
          "evidence": "在两种超声传感配置中验证自适应校准，不要求预先准确知道全部材料参数与传感器位置。",
          "limit": "验证对象是工业无损检测，并非人体AVF；对软组织、接触压力和生理变动的处理需要重新验证。",
          "ref": "P10"
        }
      ],
      "transfer": "适合处理多位置采集的定位偏差、接触状态漂移与仿真失配。同团队2026年Physical Simulator-Based Neural Networks for Real-Time Fouling Tomography已正式发表，宜作为后续精读条目，尚不据其题目推断具体性能。",
      "extra": [
        "同团队2026新论文正式书目",
        "https://doi.org/10.1145/3801966"
      ],
      "id": "G09"
    },
    {
      "country": "芬兰",
      "name": "赫尔辛基大学 Inverse Problems",
      "people": "Samuli Siltanen",
      "level": "方法深化方向",
      "tags": "不完备观测  混合反演  可恢复性",
      "official": "https://www.helsinki.fi/en/researchgroups/inverse-problems/research",
      "context": "更偏逆问题、重建及其数学结构。适合把研究重点转到哪些生理量能够从有限观测可靠恢复。",
      "papers": [
        {
          "title": "Learning the invisible: a hybrid deep learning-shearlet framework for limited angle computed tomography",
          "year": "2019",
          "venue": "Inverse Problems",
          "url": "https://doi.org/10.1088/1361-6420/ab10ca",
          "problem": "有限角度层析中，一部分结构可由观测确定，另一部分由于采样缺失而不可稳定恢复。",
          "method": "用shearlet表征区分可见与不可见分量，再通过学习补充缺失方向的信息。",
          "evidence": "在有限角度重建实验中验证结合数学结构与学习先验的策略。",
          "limit": "学习补出的信息仍依赖先验；并不等价于从实际测量中识别出了全部真实结构。",
          "ref": "P11"
        }
      ],
      "transfer": "对应你的关键问题是：哪些狭窄信息能被传感器观测，哪些只是训练分布关联。适合方法型博后，医学实验需额外平台。",
      "id": "G10"
    },
    {
      "country": "芬兰",
      "name": "东芬兰大学 STAR",
      "people": "Timo Leppänen／Samu Kainulainen",
      "level": "可穿戴与生理评价方向",
      "tags": "PPG  睡眠生理  跨设备学习",
      "official": "https://uefconnect.uef.fi/en/sleep-technology-and-analytics-research-star-group/",
      "context": "Sleep Technology and Analytics Research关注生理信号、可穿戴技术与临床睡眠测量。适合算法和生理解释拓展；若仍以CFD／FSI为首要目标，优先级低于专门的力学团队。",
      "papers": [
        {
          "title": "Variation in the Photoplethysmogram Response to Arousal From Sleep Depending on the Cause of Arousal and the Presence of Desaturation",
          "year": "2024",
          "venue": "IEEE Journal of Translational Engineering in Health and Medicine 12 328–339",
          "url": "https://doi.org/10.1109/JTEHM.2024.3349916",
          "problem": "PPG的觉醒响应能否反映不同呼吸事件与缺氧负担，而不是只作为笼统的事件标志？",
          "method": "分析觉醒前后PPG的瞬时频率和幅度，比较不同事件下的响应大小与延迟。",
          "evidence": "在876名疑似阻塞性睡眠呼吸暂停患者数据中发现事件类型及血氧下降与响应存在关联。",
          "limit": "属于生理关联研究，不是因果机制证明，也没有直接提出AVF分类器或噪声不变学习模型。",
          "ref": "P12"
        }
      ],
      "transfer": "对physiology-aware最有启发：先明确应保留哪些生理响应，再评价处理是否破坏它们。跨设备方法可结合冰岛RUSI的合作论文阅读。",
      "id": "G11"
    },
    {
      "country": "瑞典",
      "name": "隆德大学 AVF血管声学历史研究线",
      "people": "Marco Munguia Mena／Bengt Mandersson；相关生物医学信号方向Leif Sörnmo",
      "level": "直接相关历史文献",
      "tags": "AVF杂音  PCA  测量位置",
      "official": "https://portal.research.lu.se/en/publications/analysis-of-the-vascular-sounds-of-the-arteriovenous-fistula/",
      "context": "研究对象最接近你的论文，但应作为文献与学术网络线索。Leif Sörnmo官网注明2023年起为荣休教授，历史论文不能证明当前仍有同方向博后项目。",
      "papers": [
        {
          "title": "Acoustical detection of venous stenosis in Hemodialysis patients using principal component analysis",
          "year": "2010",
          "venue": "会议论文",
          "url": "https://portal.research.lu.se/en/publications/acoustical-detection-of-venous-stenosis-in-hemodialysis-patients-/",
          "problem": "AVF血管声音是否包含静脉狭窄及治疗后变化的可分辨信息？",
          "method": "利用PCA分析血管杂音，对照介入治疗前后的信号与参考记录。",
          "evidence": "病例比较支持声学特征对狭窄相关改变具有敏感性。",
          "limit": "属于早期研究，不能据此宣称已有跨医院、跨器件或大规模临床泛化。",
          "ref": "P13"
        },
        {
          "title": "Analysis of the vascular sounds of the arteriovenous fistula",
          "year": "2011",
          "venue": "Licentiate学位论文",
          "url": "https://portal.research.lu.se/en/publications/analysis-of-the-vascular-sounds-of-the-arteriovenous-fistula/",
          "problem": "声音随AVF测量位置如何变化，能否形成更有解释性的检测依据？",
          "method": "使用频谱、时频与PCA等分析吻合口及下游血管信号。",
          "evidence": "呈现不同位置声学成分的差异，并讨论以吻合口信号作参照。",
          "limit": "学位论文不是期刊论文；生理位置参照也不等同于你的环境噪声参考通道。",
          "ref": "P14"
        }
      ],
      "transfer": "适合写绪论、确定直接前人工作及设计位置实验。若用于选博后，应先确认现任接续团队、数据资源和指导安排。",
      "id": "G12"
    },
    {
      "country": "瑞典",
      "name": "卡罗林斯卡医学院 转化心血管成像",
      "people": "David Marlevi",
      "level": "仿真到真实优先",
      "tags": "合成血流  跨部位泛化  生理参数",
      "official": "https://ki.se/en/people/david-marlevi",
      "context": "偏心血管成像、计算血流和物理方法，与你的仿真数据辅助真实检测有明确方法接口。",
      "papers": [
        {
          "title": "Generalized Super-Resolution 4D Flow MRI - Using Ensemble Learning to Extend Across the Cardiovascular System",
          "year": "2024",
          "venue": "IEEE Journal of Biomedical and Health Informatics 28 7239–7250",
          "url": "https://doi.org/10.1109/JBHI.2024.3429291",
          "problem": "只针对一种血管区域训练的超分辨模型，如何扩展到不同心血管几何和流动模式？",
          "method": "使用心脏、主动脉和脑血管等合成血流数据，比较单模型与集成学习方案。",
          "evidence": "结合模拟与人体4D Flow MRI数据评价跨区域重建；部分测试通过降采样构造可比较的参考。",
          "limit": "降采样恢复不等于获得了独立采集的真实高分辨率真值；超出原始分辨率的结果有定性验证成分。",
          "ref": "P15"
        }
      ],
      "transfer": "适合把第二项研究升级为跨几何／跨工况泛化。你可贡献CFD合成样本设计，但需学习MRI观测模型与定量评价。",
      "id": "G13"
    },
    {
      "country": "瑞典",
      "name": "KTH Medical Imaging",
      "people": "Matilda Larsson",
      "level": "血管力学优先",
      "tags": "血管壁  FEM  剪切波  仿体",
      "official": "https://www.kth.se/profile/matil/?l=en",
      "context": "关注定量超声及心血管力学测量。可帮助你区分几何、材料性质与观测频谱之间的混杂。",
      "papers": [
        {
          "title": "Influence of wall thickness and diameter on arterial shear wave elastography: a phantom and finite element study",
          "year": "2017",
          "venue": "Physics in Medicine and Biology 62 2694–2718",
          "url": "https://doi.org/10.1088/1361-6560/aa591d",
          "problem": "从血管剪切波推断刚度时，管壁厚度与直径是否会造成误判？",
          "method": "结合板／管状仿体和有限元分析，研究波传播与频散对几何参数的敏感性。",
          "evidence": "仿体和数值结果说明几何会影响观测，壁厚误差可转化为材料参数估计偏差。",
          "limit": "研究是主动激励的剪切波弹性成像，不等同于血流自然激励下的被动声学机制。",
          "ref": "P16"
        }
      ],
      "transfer": "可直接借鉴你的第一项研究：不要仅证明狭窄改变频谱，还要量化壁厚、弹性和测点是否产生相似改变。",
      "id": "G14"
    },
    {
      "country": "瑞典",
      "name": "KTH I-HeaL",
      "people": "Seraina Dual",
      "level": "仿真与实验闭环优先",
      "tags": "FSI  患者特异模型  混合循环仿体",
      "official": "https://app.kth.se/profile/seraina",
      "context": "围绕心血管模型、物理模拟器和器械控制形成实验与计算结合的路线，适合延续你的数值模拟与仿体能力。",
      "papers": [
        {
          "title": "Experiments and Simulations to Assess Exercise-Induced Pressure Drop Across Aortic Coarctations",
          "year": "2025",
          "venue": "Journal of Biomechanical Engineering 147 071007",
          "url": "https://doi.org/10.1115/1.4068716",
          "problem": "静息压降较小的主动脉缩窄，在运动血流负荷下是否会出现更明显的功能障碍？",
          "method": "利用患者特异几何、顺应性仿体、混合循环回路与FSI，比较不同负荷下跨狭窄压降。",
          "evidence": "基于5名患者的模型，实验和FSI压降结果误差为1.6±1.1 mmHg；压降随心输出量增加呈非线性且具有个体差异。",
          "limit": "运动状态主要由模型和仿体构造，并非在患者真实运动时直接验证全部压力变化。",
          "ref": "P17"
        }
      ],
      "transfer": "很适合做几何狭窄程度之外的功能性评价。AVF可考虑连接流量、压降、壁振动与体表声学观测，但需自己验证耦合。",
      "id": "G15"
    },
    {
      "country": "瑞典",
      "name": "林雪平大学 Biomedical Optics",
      "people": "Tomas Strömberg／Marcus Larsson／Ingemar Fredriksson",
      "level": "光学拓展优先",
      "tags": "散斑  微循环  多光谱  可重复性",
      "official": "https://liu.se/medarbetare/tomst50",
      "context": "与你想从血流物理走向光学灌注监测非常契合，兼具模型、光学测量与微循环生理解释。",
      "papers": [
        {
          "title": "Day-to-day variability in cutaneous microcirculation measured with multi-exposure laser speckle contrast imaging and multispectral imaging",
          "year": "2025",
          "venue": "Microvascular Research 160 104819",
          "url": "https://doi.org/10.1016/j.mvr.2025.104819",
          "problem": "新型灌注和氧合指标是否足够稳定，能用于跨天比较而不是只在单次实验中显示变化？",
          "method": "联合多曝光激光散斑与多光谱成像，在前臂和足底进行基线、阻断及释放后的测量。",
          "evidence": "48名受试者完成间隔不超过一周的重复测试，分析灌注、氧合及部位相关变异。",
          "limit": "属于皮肤微循环与重复性评价，不是直接测量AVF管腔狭窄，也不能把散斑灌注指标等同于绝对宏观流量。",
          "ref": "P18"
        }
      ],
      "transfer": "可学习从信号好看转向生理量稳定的评价方式。若做声光联合，应先说明AVF变化如何影响所测微循环，而非默认两者一一对应。",
      "id": "G16"
    },
    {
      "country": "瑞典",
      "name": "林雪平大学 心血管流动成像与建模",
      "people": "Tino Ebbers／Petter Dyverfeldt／Jonas Lantz／Matts Karlsson",
      "level": "血流物理优先",
      "tags": "4D Flow  湍流  压降  CFD",
      "official": "https://liu.se/en/research/heart4flow",
      "context": "这里按合作研究网络列出；Heart4Flow页面用于理解研究基础，不表示该历史项目仍是当前招聘项目。",
      "papers": [
        {
          "title": "Estimating the irreversible pressure drop across a stenosis by quantifying turbulence production using 4D Flow MRI",
          "year": "2017",
          "venue": "Scientific Reports 7 46618",
          "url": "https://doi.org/10.1038/srep46618",
          "problem": "能否通过可观测的流动结构，估计狭窄导致的不可逆能量损失和压力下降？",
          "method": "将湍流产生率与压降联系起来，用LES／合成MRI和狭窄流动仿体检验估计方法。",
          "evidence": "研究了分辨率、噪声与几何影响，并在指定狭窄仿体中进行验证。",
          "limit": "核心验证采用稳态流，不能自动推广到所有脉动、弯曲或AVF流动；湍流能量也不等于完整声辐射强度。",
          "ref": "P19"
        }
      ],
      "transfer": "适合把狭窄标签升级为功能性血流指标，并为声学特征建立物理解释。重点应验证可测声学量与流动物理量的对应关系。",
      "id": "G17"
    },
    {
      "country": "瑞典",
      "name": "卡罗林斯卡医学院 心血管系统模拟方向",
      "people": "Michael Broomé",
      "level": "系统建模补充",
      "tags": "0D模型  氧输运  闭环循环",
      "official": "https://ki.se/en/fyfa/research/division-for-anesthesiology-and-intensive-care",
      "context": "关注整体循环和重症生理模拟，适合作为局部血管模型的上游／下游系统背景。下述是较早的方法基础，不作为近期持续投入或招生证据。",
      "papers": [
        {
          "title": "Closed-loop real-time simulation model of hemodynamics and oxygen transport in the cardiovascular system",
          "year": "2013",
          "venue": "BioMedical Engineering OnLine 12 69",
          "url": "https://doi.org/10.1186/1475-925X-12-69",
          "problem": "如何在同一实时模型中表示心脏、血管循环和氧输运及其相互影响？",
          "method": "使用多段集总循环网络，结合心腔时变弹性、瓣膜及氧输运构造闭环生理模拟器。",
          "evidence": "通过模拟不同生理状态展示整体循环与氧合响应。",
          "limit": "集总模型不能解析局部三维狭窄射流、壁面振动或声波传播。",
          "ref": "P20"
        }
      ],
      "transfer": "可为AVF局部CFD提供更生理性的边界条件；若申请博后，应核实现任实际指导人、近年项目和实验合作。",
      "id": "G18"
    },
    {
      "country": "瑞典",
      "name": "KTH 逆问题与学习重建",
      "people": "Ozan Öktem",
      "level": "方法深化方向",
      "tags": "展开网络  前向算子  数据一致性",
      "official": "https://www.kth.se/profile/ozan?l=en",
      "context": "适合从通用神经网络转向有物理结构的学习方法。研究应用包括医学成像，但不是AVF传感器专门团队。",
      "papers": [
        {
          "title": "Learned Primal-Dual Reconstruction",
          "year": "2018",
          "venue": "IEEE Transactions on Medical Imaging 37 1322–1332",
          "url": "https://doi.org/10.1109/TMI.2018.2799231",
          "problem": "纯解析／迭代重建与纯后处理神经网络之间，如何兼顾测量物理与学习能力？",
          "method": "展开原始对偶迭代，用网络学习部分更新步骤，同时显式调用前向和伴随算子。",
          "evidence": "以CT重建任务比较传统重建和学习路线，验证有限迭代下的重建能力。",
          "limit": "成像重建质量不等于疾病分类收益；迁移到声学时必须先定义可信的测量算子。",
          "ref": "P21"
        }
      ],
      "transfer": "适合构造前向一致性约束的去噪／反演。与仅添加一个PDE损失相比，重点在物理算子如何真正参与计算。",
      "id": "G19"
    },
    {
      "country": "挪威",
      "name": "Simula Computational Physiology",
      "people": "Kristian Valen-Sendstad及合作团队",
      "level": "数值模拟优先",
      "tags": "开源CFD  移动网格  血流动力学",
      "official": "https://www.simula.no/people/kvs",
      "context": "适合深化高保真血流模拟与数值可信度，也直接回应你对不用商业软件是否可行的疑问。",
      "papers": [
        {
          "title": "A verified and validated moving domain computational fluid dynamics solver with applications to cardiovascular flows",
          "year": "2023",
          "venue": "International Journal for Numerical Methods in Biomedical Engineering 39 e3703",
          "url": "https://doi.org/10.1002/cnm.3703",
          "problem": "开放的血流求解器如何可靠处理移动边界，并提供可复现的验证证据？",
          "method": "在FEniCS／Oasis基础上实现OasisMove，采用ALE处理移动计算域，开展制造解与基准验证。",
          "evidence": "以数值收敛、基准流动和实验对照检验移动域求解能力。",
          "limit": "移动域CFD本身并不自动包含完整双向FSI，更不自动包含组织传播和体表声学测量。",
          "ref": "P22"
        }
      ],
      "transfer": "你可以在成熟求解器上扩展血管壁与观测模型，无需重写所有底层数值算法。申请时有一套网格／时间步收敛验证比单纯会软件更有说服力。",
      "id": "G20"
    },
    {
      "country": "挪威",
      "name": "NTNU Ultrasound Research Group",
      "people": "Lasse Løvstakken／Svein-Erik Måsøy／Erik Smistad等",
      "level": "物理约束与系统优先",
      "tags": "数据同化  超声流速  轻量处理",
      "official": "https://www.ntnu.edu/isb/ultrasound",
      "context": "大团队内有不同研究方向，应按具体论文作者和项目联系，不能把全部成果归到一个PI名下。",
      "papers": [
        {
          "title": "Data Assimilating B-splines for Model-based Regularization in Ultrasound Vector Flow Imaging",
          "year": "2026",
          "venue": "Ultrasound in Medicine and Biology 52 2039–2047",
          "url": "https://doi.org/10.1016/j.ultrasmedbio.2026.05.028",
          "problem": "如何减少超声速度场噪声，同时尽量保留平滑滤波会抹去的速度梯度？",
          "method": "将B样条表示、变分数据同化与Navier–Stokes约束结合起来。",
          "evidence": "使用CFD数据、脉动流仿体与人体成像，对照PIV或MRI等参考进行评估。",
          "limit": "适用于速度场及其物理方程，不能未经建模就把同一约束施加到体表声波。",
          "ref": "P23"
        },
        {
          "title": "Hardware-Independent Deep Signal Processing: A Feasibility Study in Echocardiography",
          "year": "2024",
          "venue": "IEEE Transactions on Ultrasonics Ferroelectrics and Frequency Control 71 1491–1500",
          "url": "https://doi.org/10.1109/TUFFC.2024.3404622",
          "problem": "能否用紧凑网络替代部分厂商特定的超声后处理流程？",
          "method": "学习从IQ数据到B模图像的处理，并考察不同探头／平台的数据。",
          "evidence": "以图像质量及可行性实验评价网络重现处理流程的能力。",
          "limit": "图像相似度不是诊断有效性，目标端侧的实际延迟与功耗仍需单独测试。",
          "ref": "P24"
        }
      ],
      "transfer": "第一篇适合学习physics-aware信号处理，第二篇适合学习系统实现。你的研究需将波形、物理一致性和患者级任务性能分别评价。",
      "id": "G21"
    },
    {
      "country": "挪威",
      "name": "NTNU Biomedical Optics",
      "people": "Lise Lyngsnes Randeberg",
      "level": "光学反演方向",
      "tags": "高光谱  组织光学  参数可辨识性",
      "official": "https://www.ntnu.edu/employees/lisel",
      "context": "强调组织光学模型、测量与反演，研究对象包括伤口等。适合学习如何把光学参数变成可解释的生理指标。",
      "papers": [
        {
          "title": "Exploiting scale-invariance: a top layer targeted inverse model for hyperspectral images of wounds",
          "year": "2020",
          "venue": "Biomedical Optics Express 11 5070–5091",
          "url": "https://doi.org/10.1364/BOE.399636",
          "problem": "多层组织的高光谱信号中，怎样分离表层信息并识别伤口再上皮化？",
          "method": "构建针对表层的逆模型，利用尺度关系，并用Monte Carlo和离体实验研究参数关系。",
          "evidence": "结果支持表层状态识别，同时揭示不同参数组合可能产生等价观测。",
          "limit": "不是所有组织参数都可唯一求解；离体伤口实验也不是在体AVF血流监测验证。",
          "ref": "P25"
        }
      ],
      "transfer": "非常适合补足研究深度：先证明目标参数可辨识，再谈网络反演精度。多波长不能自动消除全部混杂。",
      "id": "G22"
    },
    {
      "country": "挪威",
      "name": "奥斯陆大学 DSB",
      "people": "Andreas Austeng／Sven Peter Näsholm",
      "level": "信号方法与评价方向",
      "tags": "阵列声学  超声  任务相关评价",
      "official": "https://www.visual-intelligence.no/people/andreas-austeng",
      "context": "Digital Signal Processing and Image Analysis具有医学超声与阵列处理方向。下面论文有Austeng参与，不能因为属于同一团队就归为Näsholm本人论文。",
      "papers": [
        {
          "title": "The Generalized Contrast-to-Noise Ratio: A Formal Definition for Lesion Detectability",
          "year": "2020",
          "venue": "IEEE Transactions on Ultrasonics Ferroelectrics and Frequency Control 67 745–759",
          "url": "https://doi.org/10.1109/TUFFC.2019.2956855",
          "problem": "传统对比噪声比CNR可能被动态范围压缩虚增，却没有真正改善病变可检测性。",
          "method": "以病变区和背景区的概率分布重叠定义gCNR，将指标联系到像素区分能力。",
          "evidence": "通过模拟、仿体和活体成像比较算法及动态范围变换，展示指标与单纯视觉增强的区别。",
          "limit": "仍需另行评价空间分辨率；gCNR是成像区域指标，不能直接替代患者级AVF分类、校准或临床获益。",
          "ref": "P26"
        }
      ],
      "transfer": "这篇论文直接帮助回答怎样证明去噪有效。应借鉴任务相关的评价逻辑，而不是机械地把图像指标移植到一维血管声学。",
      "id": "G23"
    },
    {
      "country": "丹麦",
      "name": "奥尔堡大学 CardioTech",
      "people": "Samuel Emil Schmidt／Johannes Jan Struijk",
      "level": "已有工作延续优先",
      "tags": "生理杂音  双麦克风  抗噪处理",
      "official": "https://vbn.aau.dk/da/persons/sschmidt/",
      "context": "与体表微弱生理杂音、额外通道和真实环境干扰有很强的方法联系，是你第四项研究应优先阅读的团队之一。",
      "papers": [
        {
          "title": "Noise reduction in abdominal acoustic recordings of maternal placental murmurs",
          "year": "2025",
          "venue": "Biomedical Physics and Engineering Express 11 025005",
          "url": "https://doi.org/10.1088/2057-1976/ada6bb",
          "problem": "弱胎盘血流杂音受外界噪声与瞬态干扰影响，怎样增强信号并保留可用于生理测量的信息？",
          "method": "双腹部麦克风联合ECG记录，比较多通道Wiener、LMS、ICA及小波等处理。",
          "evidence": "除信号相关性外，以ECG为参考评价心动周期估计误差，使去噪收益关联到生理测量。",
          "limit": "这里并没有验证AVF狭窄分类，也不能证明减少噪声就必然保留疾病判别信息。",
          "ref": "P27"
        }
      ],
      "transfer": "可以将其评价框架推进为参考噪声引导的诊断表征学习：设置噪声干预、患者独立测试，并同时报告判别能力和生理特征偏差。",
      "id": "G24"
    },
    {
      "country": "丹麦",
      "name": "DTU CFU与哥本哈根临床超声合作网络",
      "people": "Jørgen Arendt Jensen／Michael Bachmann Nielsen／Kristoffer L. Hansen等",
      "level": "AVF临床与流动测量优先",
      "tags": "AVF  矢量血流  仿真仿体  临床对照",
      "official": "https://www.healthtech.dtu.dk/Research/Research-Sections/Section-UltraSound-and-Biomechanics-USB",
      "context": "具有直接AVF研究及超声仿真、血流测量和临床合作接口。工程主团队与医院合作者共同构成研究网络。",
      "papers": [
        {
          "title": "Surveillance for hemodialysis access stenosis: usefulness of ultrasound vector volume flow",
          "year": "2016",
          "venue": "The Journal of Vascular Access 17 483–488",
          "url": "https://doi.org/10.5301/jva.5000589",
          "problem": "矢量超声估计的AVF流量，是否与超声稀释参考一致，并能用于纵向监测？",
          "method": "对19名患者进行6个月月度随访，比较矢量流量成像与超声稀释法。",
          "evidence": "19名患者随访中，流量估计r²=0.87，但一致性界限为−35%至54%，变化方向一致率为0.72。",
          "limit": "VFI与参考法分别在透析前后测量，时点差异也影响比较；相关性不是可互换性，本研究不是声学狭窄分类试验。",
          "ref": "P28"
        }
      ],
      "transfer": "对你最有价值的是建立可信的生理／临床参考。若把AVF声学与超声同步采集，可研究声音变化究竟对应几何、流量还是局部异常。",
      "id": "G25"
    },
    {
      "country": "丹麦",
      "name": "DTU Biophotonic Imaging",
      "people": "Peter E. Andersen／Gavrielle Untracht",
      "level": "光学成像拓展方向",
      "tags": "动态OCT  血管成像  定量偏差",
      "official": "https://www.healthtech.dtu.dk/research/research-sections/section-optical-sensing-and-imaging-systems-oasis/group-biophotonic-imaging",
      "context": "官网列Peter E. Andersen为组长，Gavrielle Untracht为Assistant Professor。适合功能光学成像和定量组织表征，方向与便携PPG／DCS存在距离。",
      "papers": [
        {
          "title": "Longitudinal Assessment of Vascularity in Actinic Keratosis Using Dynamic Optical Coherence Tomography: Practical Considerations and Theoretical Insights",
          "year": "2026",
          "venue": "Journal of Biophotonics 19 e70240",
          "url": "https://doi.org/10.1002/jbio.70240",
          "problem": "纵向动态OCT中的图像质量、角化层和结构伪影，如何影响皮肤血管定量？",
          "method": "分析人体皮肤病变的纵向D-OCT图像及采集策略，讨论信号形成机制与自动定量偏差。",
          "evidence": "提供实际人体纵向成像证据，重点识别不可靠图像特征与测量条件。",
          "limit": "并非通用降噪网络，也没有进行AVF狭窄或流量反演。",
          "ref": "P29"
        }
      ],
      "transfer": "可学习把观测机制、采集质量与血管指标连起来。若想尽快实现手腕可穿戴PPG，应先考虑更直接的传感器团队。",
      "id": "G26"
    },
    {
      "country": "丹麦",
      "name": "奥胡斯大学 CAReENG与CAVELab合作网络",
      "people": "Monika Colombo／Peter Johansen",
      "level": "数值模拟优先",
      "tags": "FSI  生物流体  3D打印仿体  4D Flow",
      "official": "https://mpe.au.dk/en/about-the-department/sections/fluids-and-energy/research-groups/cardiovascular-engineering-and-bio-fluids-applications",
      "context": "CAReENG明确涉及CFD／FSI、多尺度心血管流动与实验验证，Colombo为组长；CAVELab等合作提供循环实验与器械接口。",
      "papers": [
        {
          "title": "Idealized aortic annuloplasty FSI digital twin of 3D-printed phantoms with 4D-flow MRI comparison",
          "year": "2025",
          "venue": "Computers in Biology and Medicine 192 110398",
          "url": "https://doi.org/10.1016/j.compbiomed.2025.110398",
          "problem": "主动脉瓣环成形术如何改变流动，计算模型能否被独立实验观测支持？",
          "method": "制作理想化术前／术后弹性树脂仿体，连接脉动循环，以实测流压设定FSI边界，再与4D Flow MRI比较。",
          "evidence": "仿真与MRI流速相关性较高，摘要报告r>0.93，尤其在收缩期较为一致。",
          "limit": "主要为理想化仿体验证，不能推成真实患者手术预测已可靠；相关系数也不是完整误差评估。",
          "ref": "P30"
        }
      ],
      "transfer": "与你的第一、二项研究高度契合：通过可控仿体校准计算模型，再研究生成数据的有效范围和不同狭窄工况。",
      "id": "G27"
    },
    {
      "country": "冰岛",
      "name": "雷克雅未克大学 Sleep Institute RUSI",
      "people": "Erna Sif Arnardóttir；与UEF合作",
      "level": "跨设备可穿戴方向",
      "tags": "临床到居家  可穿戴  域泛化",
      "official": "https://svefnsetrid.ru.is/en/",
      "context": "有明确的临床与居家可穿戴研究论文，比宽泛的生物医学中心名称更适合作为筛选依据。Sleep Revolution项目已完成，不把历史项目经费当成当前招聘。",
      "papers": [
        {
          "title": "Generalizable Deep Learning-Based Sleep Staging Approach for Ambulatory Textile Electrode Headband Recordings",
          "year": "2023",
          "venue": "IEEE Journal of Biomedical and Health Informatics 27 1869–1880",
          "url": "https://doi.org/10.1109/JBHI.2023.3240437",
          "problem": "新型居家织物电极头带缺少大量标注数据，能否利用既有临床眼电数据建立睡眠分期模型？",
          "method": "利用标准EOG与额部头带信号的相似性，训练全卷积网络，再评价跨设备及居家泛化。",
          "evidence": "临床数据共876例，独立临床测试88例；10名健康志愿者居家实验中，头带五分类准确率约82%。",
          "limit": "新设备外部样本仅10名健康人；不是AVF或光学前向模型，也未覆盖所有器件与病理状态。",
          "ref": "P31"
        }
      ],
      "transfer": "适合向跨设备可穿戴算法转型。关键启发是明确源域和目标域的可比信息，并保留真正独立的目标设备测试。",
      "id": "G28"
    }
  ],
  "funding": [
    {
      "id": "msca-pf",
      "title": "MSCA Postdoctoral Fellowships 玛丽·居里博后",
      "region": "欧洲",
      "hostRegions": [
        "欧盟",
        "Horizon Europe联系国",
        "北欧"
      ],
      "kind": "博后个人项目",
      "summary": "与接收团队共同设计跨国博后项目，支持培训、研究与跨学科合作，适合把已有声学研究扩展到光学感知。",
      "fit": "优先关注：AVF建模、sim-to-real、光学可穿戴均可形成跨学科方案。",
      "eligibility": "European PF允许任何国籍；截止日前须已获博士或完成答辩，博士后研究经历通常不超过8年。须满足目标国过去36个月内居留/主要活动不超过12个月等流动规则。Global PF另有欧洲国籍或长期居民要求。",
      "deadline": null,
      "deadlineNote": "2027轮官网暂列4月7日开放、9月8日截止，均标TBC，须等待正式call；勿视为当前开放。",
      "status": "recurring",
      "url": "https://marie-sklodowska-curie-actions.ec.europa.eu/funding/msca-postdoctoral-fellowships-2027",
      "checkedAt": "2026-10-12",
      "tags": [
        "优先关注",
        "跨学科",
        "北欧",
        "建模",
        "可穿戴",
        "sim-to-real"
      ]
    },
    {
      "id": "humboldt-postdoc",
      "title": "Humboldt Research Fellowship 洪堡研究奖学金",
      "region": "德国",
      "hostRegions": [
        "德国"
      ],
      "kind": "博后个人项目",
      "summary": "支持与德国接收导师共同开展独立研究，博后阶段通常可安排6至24个月研究访问，覆盖各学科。",
      "fit": "优先关注：适合寻找血流力学、生物医学声学或光学反演导师后联合申请。",
      "eligibility": "博后通道通常要求博士取得不超过4年，并有德国导师接收及研究条件确认；国籍、德国教育背景和过去18个月在德停留须核验。尚未毕业者须符合评审前完成博士等规则。",
      "deadline": null,
      "deadlineNote": "官网显示当前轮达到申请上限，暂不能新建申请；下一轮于2026-11-15开放。以新轮次页面和名额为准。",
      "status": "closed",
      "url": "https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship",
      "checkedAt": "2026-10-12",
      "tags": [
        "优先关注",
        "洪堡",
        "自主课题",
        "建模",
        "光学"
      ]
    },
    {
      "id": "jsps-standard",
      "title": "JSPS 外国人特别研究员 Standard",
      "region": "日本",
      "hostRegions": [
        "日本"
      ],
      "kind": "博后个人项目",
      "summary": "由日本接收研究者及机构提交申请，支持海外青年博士在日本合作研究12至24个月，覆盖自然科学等领域。",
      "fit": "优先关注：适合光学测量、超声、血流仿真与医疗信号处理团队。",
      "eligibility": "须核验国籍/日本永久居留限制及按财政年度计算的博士6年窗口；可在入职前获得博士。曾获并启动Standard等特定JSPS项目者受限制。由日本导师经机构申报。",
      "deadline": "2027-04-23",
      "deadlineNote": "FY2027第二轮为2027-04-23 17:00日本时间，指机构提交JSPS截止；校内截止通常更早，系统开放另行核验。第一轮已截止。",
      "status": "recurring",
      "url": "https://www.jsps.go.jp/english/e-fellow/e-ippan/appliguidelines.html",
      "checkedAt": "2026-10-12",
      "tags": [
        "优先关注",
        "日本",
        "接收导师",
        "光学",
        "生物医学工程"
      ]
    },
    {
      "id": "newton-international",
      "title": "Newton International Fellowships 牛顿国际博后",
      "region": "英国",
      "hostRegions": [
        "英国"
      ],
      "kind": "博后个人项目",
      "summary": "支持英国以外的青年研究者赴英开展研究，涵盖工程、数学、物理和生物医学科学，须与英国导师共同准备。",
      "fit": "优先关注：适合物理驱动学习、医学成像及计算生物力学方向。",
      "eligibility": "2026规则要求非英国国籍、申请时位于英国以外，截止日前获博士或完成答辩，博士后全职研究经历不超过5年；每位英国导师每轮仅支持1人。须按下一轮规则重新核验。",
      "deadline": "2026-03-11",
      "deadlineNote": "已核验2026轮于2026-03-11截止；下一轮日期尚未在本条确认。",
      "status": "closed",
      "url": "https://royalsociety.org/grants/newton-international/",
      "checkedAt": "2026-10-12",
      "tags": [
        "优先关注",
        "英国",
        "跨学科",
        "反演",
        "建模"
      ]
    },
    {
      "id": "eth-fellows",
      "title": "ETH Zurich Postdoctoral Fellowships",
      "region": "瑞士",
      "hostRegions": [
        "瑞士"
      ],
      "kind": "校级博后项目",
      "summary": "支持赴苏黎世联邦理工开展两年自主博后研究，要求与接收团队互补，重视候选人的原创课题与独立性。",
      "fit": "优先关注：计算力学、传感器、光学与机器学习团队均可能匹配。",
      "eligibility": "博士通常取得不超过2年，或截止后6个月内取得；需ETH导师、论文或博士论文奖，并满足瑞士及ETH体系/苏黎世大学既往居留与工作限制。与导师既往紧密合作需核查。",
      "deadline": "2027-03-01",
      "deadlineNote": "官网固定每年3月1日、9月1日17:00瑞士当地时间截止，周末顺延。系统一般提前约1个月开放；具体轮次仍以官网为准。",
      "status": "recurring",
      "url": "https://grantsoffice.ethz.ch/funding-opportunities/internal/eth-fellowships.html",
      "checkedAt": "2026-10-12",
      "tags": [
        "瑞士",
        "自主课题",
        "博士年限",
        "建模",
        "光学"
      ]
    },
    {
      "id": "branco-weiss",
      "title": "Branco Weiss Fellowship",
      "region": "全球",
      "hostRegions": [
        "全球"
      ],
      "kind": "独立研究资助",
      "summary": "支持青年博士在全球学术接收机构探索偏离学科主流的原创问题，强调大胆跨界及科学与社会的联系。",
      "fit": "条件匹配：需提出显著超越现有分类模型改进的原创研究问题。",
      "eligibility": "2027轮要求2027-01-15前完成博士，博士年限不超过5年；不得已任或曾任相当于教职的岗位。需接收导师支持、突出成果及非常规研究构想。",
      "deadline": "2027-01-15",
      "deadlineNote": "官网2027轮已开放；2027-01-15 17:00 CET截止。",
      "status": "open",
      "url": "https://brancoweissfellowship.org/who-should-apply/timelines/",
      "checkedAt": "2026-10-12",
      "tags": [
        "全球",
        "跨学科",
        "独立研究",
        "高风险研究"
      ]
    },
    {
      "id": "wellcome-early-career",
      "title": "Wellcome Early-Career Awards",
      "region": "英国及指定地区",
      "hostRegions": [
        "英国",
        "符合规则的低中收入国家"
      ],
      "kind": "独立研究资助",
      "summary": "资助青年研究者建立独立研究方向，可支持有助于健康研究的新方法、模型、工具或技术，通常为多年项目。",
      "fit": "条件匹配：适合明确回答健康研究问题的物理驱动感知，而非单纯工程性能优化。",
      "eligibility": "需完成博士答辩或具备认可的等效研究经历、合格管理机构和支持导师；既有长期教职及同阶段资助受到限制。地点资格正在调整，不能只按国籍判断。",
      "deadline": null,
      "deadlineNote": "当前官网为随时提交。2026-10-29起地点规则调整为英国及非洲、南亚、东南亚的合格低中收入国家；应按实际提交日期核验。",
      "status": "open",
      "url": "https://wellcome.org/research-funding/schemes/wellcome-early-career-awards",
      "checkedAt": "2026-10-12",
      "tags": [
        "健康研究",
        "方法学",
        "独立研究",
        "资格需核验"
      ]
    },
    {
      "id": "aha-postdoctoral",
      "title": "American Heart Association 博后资助",
      "region": "美国",
      "hostRegions": [
        "美国"
      ],
      "kind": "博后个人项目",
      "summary": "支持在美国非营利机构内、由导师指导的心血管或脑血管健康研究，适合血管监测与血流机制相关训练。",
      "fit": "学科高度相关；须先解决美国接收团队、合法身份和实验经费配套。",
      "eligibility": "启动时须有博士且博士后研究经历通常不超过5年；提交时即须具有项目认可的美国公民/居留/签证身份，并需AHA会员。额外研究经费主要由导师团队支持。",
      "deadline": "2026-08-05",
      "deadlineNote": "2027资助年度申请于2026-08-05 15:00美国中部时间截止；下一轮未确认。",
      "status": "closed",
      "url": "https://professional.heart.org/en/research-programs/aha-funding-opportunities/postdoctoral-fellowship",
      "checkedAt": "2026-10-12",
      "tags": [
        "美国",
        "心血管",
        "AVF",
        "签证条件",
        "导师配套"
      ]
    },
    {
      "id": "hfsp-postdoctoral",
      "title": "HFSP Long-Term / Cross-Disciplinary Fellowships",
      "region": "国际",
      "hostRegions": [
        "依HFSP成员国及国籍规则确定"
      ],
      "kind": "博后个人项目",
      "summary": "支持跨国进入新研究领域、以生命科学基础问题为中心的前沿项目；工程或物理博士可核验跨学科通道。",
      "fit": "谨慎匹配：必须有新的生物学问题；常规诊断工具开发不等于HFSP适配项目。已有生物医学经历可能影响CDF资格。",
      "eligibility": "博士时间窗口、国籍与接收国、不得留在博士所在国及与接收导师的既往合作限制均须核验。CDF针对非生物博士且生命科学经历很少者，不能仅因工程学位自动判定。",
      "deadline": "2026-09-24",
      "deadlineNote": "2027轮意向书阶段已截止；2026-09-24为受邀完整申请截止，现不能作为新申请入口。下一轮以新call为准。",
      "status": "closed",
      "url": "https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships",
      "checkedAt": "2026-10-12",
      "tags": [
        "生命科学",
        "跨学科",
        "基础机制",
        "条件匹配"
      ]
    },
    {
      "id": "embo-postdoctoral",
      "title": "EMBO Postdoctoral Fellowships",
      "region": "欧洲及符合条件的国际流动",
      "hostRegions": [
        "欧洲",
        "其他符合EMBO流动规则的国家"
      ],
      "kind": "博后个人项目",
      "summary": "支持围绕生物学机制的国际流动博后研究，最长通常两年；可考虑与血管生理机制紧密结合的跨学科方案。",
      "fit": "谨慎匹配：必须产生生物学认识，纯分类精度、传感器开发或描述性分析通常不足。",
      "eligibility": "需核验博士年限、第一作者论文或认可的审评预印本、跨国流动和接收实验室限制。自2026秋季轮起，同一实验室每轮最多支持1名候选人。",
      "deadline": "2027-01-22",
      "deadlineNote": "全年收件；下一硬截止为2027-01-22 14:00 CET。该截止之后的新申请将适用不再允许重新申请的新规则。",
      "status": "open",
      "url": "https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/",
      "checkedAt": "2026-10-12",
      "tags": [
        "生命科学",
        "基础机制",
        "跨国流动",
        "条件匹配"
      ]
    },
    {
      "id": "schmidt-science-fellows",
      "title": "Schmidt Science Fellows",
      "region": "全球",
      "hostRegions": [
        "全球，研究安置须获项目认可"
      ],
      "kind": "提名制博后项目",
      "summary": "支持优秀应届博士离开原博士学科、开展实质性跨学科转向；须由博士授予机构提名，不能自由直接申请。",
      "fit": "条件匹配：从声学工程转向新的生理机制或生物光学可能适配，但需证明实质性学科转向。",
      "eligibility": "2027轮须由伙伴机构提名，博士领域为自然科学、工程、数学或计算；完成博士全部要求的时间须在2026-05-01至2027-06-30。尚未确认用户学校和毕业时间。",
      "deadline": "2026-07-13",
      "deadlineNote": "2027轮个人申请截止2026-07-13，机构提名更早，当前轮已关闭。后续年度窗口不能沿用。",
      "status": "closed",
      "url": "https://schmidtsciencefellows.org/selection/who-can-apply/",
      "checkedAt": "2026-10-12",
      "tags": [
        "全球",
        "机构提名",
        "跨学科转向",
        "毕业窗口"
      ]
    },
    {
      "id": "fripro-international-mobility",
      "title": "挪威 FRIPRO International Mobility",
      "region": "挪威及海外",
      "hostRegions": [
        "挪威",
        "海外合作机构"
      ],
      "kind": "国际流动项目",
      "summary": "由挪威研究机构申报，结合海外研究阶段与挪威阶段，支持青年研究者发展独立课题并将新知识带回挪威。",
      "fit": "有挪威经历时再关注；不能当作所有海外博士赴挪威的通用入境奖学金。",
      "eligibility": "当前规则要求挪威硕士或博士，过去7年在挪威居住/工作至少12个月，博士通常不超过7年；须由认可的挪威机构全程雇用，另有海外流动限制。",
      "deadline": null,
      "deadlineNote": "当前为持续收件，项目计划启动须在提交后8至18个月；有等待期或重复申报限制者另行核验。",
      "status": "open",
      "url": "https://www.forskningsradet.no/en/call-for-proposals/2025/researcher-project-international-mobility-fripro/",
      "checkedAt": "2026-10-12",
      "tags": [
        "北欧",
        "挪威",
        "已有挪威背景",
        "机构申报"
      ]
    },
    {
      "id": "nnf-uppsala",
      "title": "Novo Nordisk Foundation 乌普萨拉博后",
      "region": "瑞典与丹麦",
      "hostRegions": [
        "瑞典",
        "丹麦"
      ],
      "kind": "国际流动项目",
      "summary": "支持在乌普萨拉开展研究并回到丹麦的三年博后方案，需建立瑞典和丹麦两个接收端的共同研究安排。",
      "fit": "有丹麦教育或科研联系时关注；可考虑生命科学与工程交叉研究。",
      "eligibility": "须有乌普萨拉导师与丹麦接收导师；丹麦机构全程雇用和管理经费。需证明丹麦教育/研究联系，例如丹麦学历、国籍或多年科研经历；博士与既往乌普萨拉任职条件另核验。",
      "deadline": "2027-01-29",
      "deadlineNote": "2027轮2026-09-30开放，2027-01-29 14:00哥本哈根时间截止；链接路径含2026但页面标题已更新为2027。",
      "status": "open",
      "url": "https://novonordiskfonden.dk/en/grant/postdoctoral-fellowships-at-uppsala-university-2026/",
      "checkedAt": "2026-10-12",
      "tags": [
        "北欧",
        "瑞典",
        "丹麦背景",
        "双接收机构"
      ]
    },
    {
      "id": "carlsberg-internationalisation",
      "title": "Carlsberg Internationalisation Fellowships",
      "region": "丹麦及海外",
      "hostRegions": [
        "丹麦",
        "格陵兰",
        "法罗群岛",
        "海外合作机构"
      ],
      "kind": "国际流动项目",
      "summary": "支持与丹麦研究环境有联系的青年博士赴海外研究，并可结合回归阶段，适合长期建立国际研究合作。",
      "fit": "资格受限：目前不应作为无丹麦学历背景者的优先申请项目。",
      "eligibility": "2026官方说明要求博士由丹麦研究机构授予；2027页面扩及格陵兰和法罗群岛，更新指南尚待开轮发布。须按2027具体资格复核，不能假定仅找到丹麦导师即可。",
      "deadline": "2027-04-01",
      "deadlineNote": "官网列2027-01-30开放、2027-04-01 16:00截止；当前未开放，2027新版指南待发布。",
      "status": "closed",
      "url": "https://carlsbergfondet.dk/ansoeger/internationaliseringsstipendier/",
      "checkedAt": "2026-10-12",
      "tags": [
        "北欧",
        "丹麦背景",
        "国际流动",
        "资格受限"
      ]
    },
    {
      "id": "cost-stsm",
      "title": "COST Short-Term Scientific Missions 短期访问",
      "region": "欧洲合作网络",
      "hostRegions": [
        "依具体COST Action及国家规则确定"
      ],
      "kind": "短期交流资助",
      "summary": "通过具体COST Action资助跨国短期研究访问、技能学习和合作，可用于试验一种方法或建立博后合作关系。",
      "fit": "适合访问交流：先寻找生物光学、数值建模或生物医学信号相关Action。",
      "eligibility": "不是统一面向所有人的全年个人基金；须满足Action主题、申请者所属机构/国家及该轮资助条件，访问目标应符合Action工作任务。",
      "deadline": null,
      "deadlineNote": "各Action分别发起招募和截止；本条为资助机制入口，不代表已找到当前开放且与你匹配的具体访问名额。",
      "status": "recurring",
      "url": "https://www.cost.eu/Annotated_Rules_for_COST_Actions_C",
      "checkedAt": "2026-10-12",
      "tags": [
        "短期访问",
        "交流",
        "欧洲",
        "合作网络"
      ]
    },
    {
      "id": "fulbright-visiting-scholar",
      "title": "Fulbright Visiting Scholar 访问学者",
      "region": "美国",
      "hostRegions": [
        "美国"
      ],
      "kind": "访问学者资助",
      "summary": "经申请人所在国家或地区的项目渠道遴选，支持赴美研究或教学访问；可作为国际交流机会的条件性线索。",
      "fit": "先核验国籍对应项目是否实际开放，再评估医学工程研究计划；不自动等同博后岗位。",
      "eligibility": "须为参与该项目国家的公民，具有博士或认可的等效专业资历，并满足本国项目额外条件。未确认用户国籍，不判断个人可申请；不能套用美国公民出境通道。",
      "deadline": null,
      "deadlineNote": "国家/地区分别制定开放范围和截止；本条只核验全球项目入口，未确认用户对应国家当前有可用名额。",
      "status": "check",
      "url": "https://fulbrightscholars.org/non-us-scholars/fulbright-visiting-scholar-program",
      "checkedAt": "2026-10-12",
      "tags": [
        "美国",
        "访问学者",
        "国别资格",
        "需核验"
      ]
    }
  ],
  "opportunities": [
    {
      "id": "opp-aalto-asci-visit",
      "title": "AScI 短期科研访问｜博士生与博后均有通道",
      "institution": "阿尔托大学 School of Science / AScI",
      "country": "芬兰",
      "kind": "visit",
      "status": "open",
      "summary": "持续开放的访问机制：博士生可访问1周至2个月，博后及以上可访问1至4周，支持交通与住宿。须先找到阿尔托理学院接待者，由接待方提交申请。",
      "fit": "适合先与生物医学工程、数学反演或传感方向团队完成短期共同研究，验证合作是否适合后续博后；接收意向和研究匹配仍须与导师协商。",
      "requirements": "申请由阿尔托School of Science研究人员提交；对应博士在读或博后及以上身份。先准备CV、访问目标与计划，并确认接待者所属学院及项目细则。",
      "deadline": null,
      "deadlineNote": "每月末受理，6月和7月除外；官网宣布2027年继续。访问计划与内部申请时间由接待方确认。",
      "url": "https://www.aalto.fi/en/aalto-university-science-institute-asci",
      "checkedAt": "2026-10-12",
      "tags": [
        "短期访问",
        "博士在读可考虑",
        "物理驱动AI",
        "逆问题",
        "导师接洽"
      ]
    },
    {
      "id": "opp-flatiron-ccm-2027",
      "title": "Flatiron CCM 博后｜计算数学与科学机器学习",
      "institution": "Simons Foundation / Flatiron Institute",
      "country": "美国",
      "kind": "postdoc",
      "status": "open",
      "summary": "招聘2027年入职的计算数学博后，涵盖PDE数值分析、科学机器学习、统计反演、计算生物物理及开源科学软件。初聘2年，可根据表现续至第3年。",
      "fit": "适合希望强化数值算法、反演和物理模型学习的申请者。属于方法方向匹配，不是已经公布的AVF专项岗位；研究计划需要对接具体CCM导师。",
      "requirements": "相关领域博士；CV与论文清单、研究陈述、潜在导师姓名及3封推荐信。公告要求申请材料体现本人研究判断，限制大篇幅AI代写。",
      "deadline": "2026-11-15",
      "deadlineNote": "11月15日为完整考虑的优先截止日，含推荐信；之后按空缺滚动评审。预计2027年7月至10月入职。",
      "url": "https://www.simonsfoundation.org/flatiron/careers/?tab=job-openings",
      "applicationUrl": "https://apply.interfolio.com/193799",
      "additionalSources": [
        "https://www.mathjobs.org/jobs/list/29080"
      ],
      "checkedAt": "2026-10-12",
      "tags": [
        "科学机器学习",
        "数值模拟",
        "逆问题",
        "开放博后",
        "2027入职"
      ]
    },
    {
      "id": "opp-usc-applegate-2026",
      "title": "USC 光学成像博后｜OCT与内耳功能测量",
      "institution": "南加州大学 Applegate Laboratory",
      "country": "美国",
      "kind": "postdoc",
      "status": "open",
      "summary": "开发活体内耳成像技术，结合OCT、超快激光与图像引导操作，并开展离体及在体验证。岗位编号REQ20178764。",
      "fit": "适合向光学硬件、微振动和功能测量拓展。与你的声学和生物力学背景有接口，但研究对象为内耳，并非心血管或PPG；实验光学经验是需要补足的重点。",
      "requirements": "生物医学工程、光学、物理、电子、机械工程或相关博士；欢迎OCT、光学系统、激光组织相互作用、图像处理及MATLAB/Python/C++经验。",
      "deadline": "2026-11-30",
      "deadlineNote": "官方招聘系统列示2026年11月30日结束；提交前再次核对是否提前招满。",
      "url": "https://usc.wd5.myworkdayjobs.com/en-US/ExternalUSCCareers/job/Postdoctoral-Scholar---Research-Associate_REQ20178764",
      "checkedAt": "2026-10-12",
      "tags": [
        "光学感知",
        "OCT",
        "生物力学",
        "开放博后",
        "跨领域拓展"
      ]
    },
    {
      "id": "opp-aalto-audio-2026",
      "title": "阿尔托音频博后｜鲁棒表征与水印检测",
      "institution": "阿尔托大学 DICE / Lauri Juvela团队",
      "country": "芬兰",
      "kind": "postdoc",
      "status": "open",
      "summary": "COWAMA项目开发生成音频的内容水印，研究鲁棒性、泛化、音频表征和质量评价。初聘2年，预计2027年1月或协商日期入职。",
      "fit": "仅为方法相邻机会：信号处理、抗干扰评价和深度学习可以迁移，但该岗位研究语音与音乐，不是生理声学或医学监测。适合愿意改变应用领域时考虑。",
      "requirements": "音频、机器学习、信号处理、计算机等相关博士或接近毕业；深度学习与生成模型经验、Python及良好英语。提交CV、动机信和学位成绩材料。",
      "deadline": "2026-10-31",
      "deadlineNote": "2026年10月31日23:59，官网标注EET；以招聘系统最终时间为准。",
      "url": "https://www.aalto.fi/en/open-positions/postdoctoral-researcher-in-speech-and-language-technology",
      "checkedAt": "2026-10-12",
      "tags": [
        "音频信号",
        "鲁棒学习",
        "域泛化",
        "开放博后",
        "方法相邻"
      ]
    },
    {
      "id": "opp-simula-acleanbrain-closed",
      "title": "Simula aCleanBrain 科学计算博后｜已截止",
      "institution": "Simula Research Laboratory / Kent-Andre Mardal",
      "country": "挪威",
      "kind": "postdoc",
      "status": "closed",
      "summary": "2年博后，研究脑液体输运与清除，结合有限元、多物理场、降阶和机器学习。保留这条已截止公告，用于了解团队方向和申请能力要求。",
      "fit": "你的血流建模、数值方法与仿真数据经验有较强迁移性；研究器官和生理问题不同。可跟踪下一轮招聘，不能视作仍开放的申请。",
      "requirements": "应用数学、科学计算、生物工程等背景，微分方程数值方法与Python/Matlab/Julia能力；公告允许最迟入职后6个月完成博士。",
      "deadline": "2026-10-04",
      "deadlineNote": "已于2026年10月4日截止；预计2027年1月入职。页面仍存在不代表仍接受申请。",
      "url": "https://www.simula.no/careers/job-openings/postdoctoral-fellowship-available-in-scientific-computing-at-simula-research-laboratory",
      "checkedAt": "2026-10-12",
      "tags": [
        "数值模拟",
        "有限元",
        "降阶模型",
        "已截止",
        "跟踪团队"
      ]
    },
    {
      "id": "opp-euraxess-portal",
      "title": "EURAXESS｜全球岗位与接收导师检索",
      "institution": "EURAXESS / European Commission",
      "country": "国际",
      "kind": "portal",
      "status": "portal",
      "summary": "官方聚合入口，可分别检索JOB与HOSTING。建议组合postdoc、biomedical optics、hemodynamics、inverse problems等关键词，并查看原始机构公告。",
      "fit": "适合同时寻找带薪博后及愿意共同准备国际申请的接收团队。HOSTING通常代表接收或合作意向，不等于已获经费的岗位。",
      "requirements": "按每条公告核对博士年限、研究技能和申请材料；将职位类别与资助类别分开筛选。",
      "deadline": null,
      "deadlineNote": "长期检索入口；每条招聘或接收意向有独立日期。",
      "url": "https://euraxess.ec.europa.eu/jobs/search",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "博后",
        "接收导师",
        "访问交流",
        "国际"
      ]
    },
    {
      "id": "opp-oulu-portal",
      "title": "奥卢大学｜生物光子学与逆问题岗位入口",
      "institution": "University of Oulu",
      "country": "芬兰",
      "kind": "portal",
      "status": "portal",
      "summary": "从校级Careers页面进入Open positions；重点检索biophotonics、biomedical sensors、computational mathematics和inverse problems。",
      "fit": "对应既有目录中的Bykau、Myllylä与Hauptmann方向，适合光学前向建模、便携感知及学习反演。未核验到这些团队当前开放的具体匹配博后。",
      "requirements": "以具体公告的博士学位、编程或实验技能要求为准；可先整理模型、仿真数据集和信号算法成果用于接洽。",
      "deadline": null,
      "deadlineNote": "长期官方入口，不代表以上团队正在招人。",
      "url": "https://www.oulu.fi/en/university/careers",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "光学感知",
        "逆问题",
        "PPG",
        "Monte Carlo"
      ]
    },
    {
      "id": "opp-ki-portal",
      "title": "KI｜心血管成像与计算研究岗位入口",
      "institution": "Karolinska Institutet",
      "country": "瑞典",
      "kind": "portal",
      "status": "portal",
      "summary": "KI校级岗位页面支持职位类型、院系和关键词筛选。重点关注cardiovascular imaging、4D flow、medical AI及computational physiology。",
      "fit": "适合追踪Marlevi等心血管成像团队。筛选时要区分计算成像岗位与湿实验血管生物学岗位，仅名称含cardiovascular不一定匹配。",
      "requirements": "核对岗位是雇佣合同还是奖学金、研究技能要求及博士完成时间；以具体原始公告为准。",
      "deadline": null,
      "deadlineNote": "长期官方入口；未将检索入口当作Marlevi团队的具体招聘。",
      "url": "https://ki.se/en/about-ki/jobs-at-ki/available-positions-at-ki",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "心血管成像",
        "4D Flow",
        "医学AI",
        "临床验证"
      ]
    },
    {
      "id": "opp-kth-portal",
      "title": "KTH｜生物力学、传感与逆问题岗位入口",
      "institution": "KTH Royal Institute of Technology",
      "country": "瑞典",
      "kind": "portal",
      "status": "portal",
      "summary": "官方职位目录列出申请截止日；建议检索biomedical、cardiovascular、ultrasound、inverse及computational等关键词。",
      "fit": "对接Larsson的血管测量、Dual的生理建模及Öktem的学习反演等不同路线。需要逐个核对研究课题，不能仅凭学校或医学关键词判断匹配。",
      "requirements": "博士岗位与博后岗位分开筛选；要求以具体招聘为准，通常需展示相关数值、实验或算法研究成果。",
      "deadline": null,
      "deadlineNote": "长期官方入口；每条具体岗位有独立截止日。",
      "url": "https://www.kth.se/lediga-jobb?l=en",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "生物力学",
        "传感",
        "逆问题",
        "数字孪生"
      ]
    },
    {
      "id": "opp-dtu-visit-portal",
      "title": "DTU 访问研究｜官方接洽与注册路径",
      "institution": "Technical University of Denmark",
      "country": "丹麦",
      "kind": "portal",
      "status": "portal",
      "summary": "DTU欢迎客座研究者和访问博士生；官网要求先与拟访问院系或研究者商定访问日期和研究范围。这是访问流程，不是一个已批准或已资助的名额。",
      "fit": "可围绕CFU的血流测量、AVF临床参考，或Biophotonic Imaging的功能光学成像拟定短期共同实验。",
      "requirements": "先获得接待团队意向，再明确研究计划、访问身份、经费安排与注册手续；是否提供经费须单独协商。",
      "deadline": null,
      "deadlineNote": "无统一截止日；接待安排须由团队确认。",
      "url": "https://www.dtu.dk/english/about/job-and-career/guests-and-visiting-researchers",
      "additionalSources": [
        "https://www.dtu.dk/english/about/job-and-career/vacant-positions"
      ],
      "checkedAt": "2026-10-12",
      "tags": [
        "访问交流",
        "官方入口",
        "AVF",
        "超声",
        "光学感知"
      ]
    },
    {
      "id": "opp-tampere-portal",
      "title": "坦佩雷大学｜可穿戴与生理测量岗位入口",
      "institution": "Tampere University",
      "country": "芬兰",
      "kind": "portal",
      "status": "portal",
      "summary": "官方英文岗位目录；优先检索sensor、biomeasurement、wearable、signal processing，并与STB团队方向交叉核对。",
      "fit": "与额外参考通道、PPG伪影、多通道生理测量及轻量化实现相近。当前入口不代表Vehkaoja团队有已确认空缺。",
      "requirements": "通过具体公告指定系统提交。学校说明不接受未对应招聘公告的开放求职申请或逾期申请；学术合作接洽不等于正式求职申请。",
      "deadline": null,
      "deadlineNote": "长期官方入口；以具体岗位截止日为准。",
      "url": "https://www.tuni.fi/en/tau/work-with-us/open-positions",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "可穿戴",
        "参考通道",
        "PPG",
        "信号处理"
      ]
    },
    {
      "id": "opp-ntnu-portal",
      "title": "NTNU｜超声、光学与物理约束处理岗位入口",
      "institution": "Norwegian University of Science and Technology",
      "country": "挪威",
      "kind": "portal",
      "status": "portal",
      "summary": "NTNU官方空缺目录，适合持续查找ultrasound、biomedical optics、medical imaging和inverse modelling等方向。",
      "fit": "对应既有报告中的超声研究团队和Randeberg光学方向。物理约束速度场处理、系统实验及定量反演与现有研究有接口。",
      "requirements": "核对具体职位的博士资格、编程或光学实验要求，访问合作需另行与团队商定。",
      "deadline": null,
      "deadlineNote": "长期官方入口；未把研究团队介绍当作开放博后。",
      "url": "https://www.ntnu.edu/vacancies",
      "checkedAt": "2026-10-12",
      "tags": [
        "官方入口",
        "超声",
        "光学感知",
        "物理驱动AI",
        "反演"
      ]
    }
  ],
  "english": {
    "lessons": [
      {
        "id": "day-01",
        "day": 1,
        "topic": "一句话介绍研究",
        "sentence": "My doctoral research focuses on acoustic sensing and numerical modeling for detecting stenosis in arteriovenous fistulas.",
        "translation": "我的博士研究聚焦于通过声学感知和数值建模检测动静脉内瘘狭窄。",
        "pronunciationTip": "按 My doctoral research / focuses on acoustic sensing and numerical modeling / for detecting stenosis / in arteriovenous fistulas 分意群；重读 focuses、acoustic sensing 和 stenosis。",
        "question": "Could you briefly introduce your doctoral research?",
        "answerHint": "先说研究对象、测量方式和目标；展开时使用你真实做过的研究内容，不添加未完成的临床应用。",
        "keywords": [
          "doctoral research",
          "acoustic sensing",
          "arteriovenous fistula"
        ]
      },
      {
        "id": "day-02",
        "day": 2,
        "topic": "说明研究动机",
        "sentence": "I am interested in whether vascular sounds can provide useful information about changes in blood flow and vessel narrowing.",
        "translation": "我关注血管声音能否提供有关血流变化和血管狭窄的有效信息。",
        "pronunciationTip": "在 whether 后稍作停顿；把 useful information、blood flow 和 vessel narrowing 读清楚，不必整句匀速。",
        "question": "What motivated you to investigate vascular sounds?",
        "answerHint": "说明实际检测需求，再解释声学测量的研究价值；将有待验证的潜力与已有证据分开。",
        "keywords": [
          "vascular sounds",
          "blood flow",
          "vessel narrowing"
        ]
      },
      {
        "id": "day-03",
        "day": 3,
        "topic": "串联研究主线",
        "sentence": "My work connects physical modeling, simulation assisted learning, multisite sensing, and noise robust analysis within a common detection task.",
        "translation": "我的工作围绕同一个检测任务，将物理建模、仿真辅助学习、多位置感知与抗噪分析连接起来。",
        "pronunciationTip": "列举四个研究环节时保持相似节奏；最后在 common detection task 上收束，强调它们服务于同一个任务。",
        "question": "How do the different parts of your thesis fit together?",
        "answerHint": "用机理、数据、检测和实际干扰的逻辑组织四项工作；不要只是依次列出论文名称。",
        "keywords": [
          "physical modeling",
          "multisite sensing",
          "detection task"
        ]
      },
      {
        "id": "day-04",
        "day": 4,
        "topic": "解释二维模型",
        "sentence": "I use two dimensional models to explore how stenosis location and severity affect flow patterns and related acoustic characteristics.",
        "translation": "我使用二维模型探索狭窄位置和程度如何影响流动模式及相关声学特征。",
        "pronunciationTip": "将 two dimensional models、stenosis location and severity、acoustic characteristics 分别作为完整短语；重读 location 和 severity。",
        "question": "Why did you start with two dimensional models?",
        "answerHint": "结合实际建模过程解释计算成本、参数扫描和可解释性，并交代二维假设的适用范围。",
        "keywords": [
          "two dimensional models",
          "stenosis severity",
          "flow patterns"
        ]
      },
      {
        "id": "day-05",
        "day": 5,
        "topic": "解释三维模型",
        "sentence": "Three dimensional models help me examine spatial effects that simplified models may miss, especially when geometry influences the measured signal.",
        "translation": "三维模型帮助我考察简化模型可能遗漏的空间效应，尤其是几何形态影响测量信号时。",
        "pronunciationTip": "在 may miss 后停顿；spatial effects 和 geometry 是信息重点，避免把全部重音放在 dimensional 上。",
        "question": "What additional information can a three dimensional model provide?",
        "answerHint": "用你实际比较过的空间现象回答；没有完成的比较应明确表述为下一步验证计划。",
        "keywords": [
          "three dimensional models",
          "spatial effects",
          "geometry"
        ]
      },
      {
        "id": "day-06",
        "day": 6,
        "topic": "比较模型层级",
        "sentence": "A key question is which features remain consistent across model dimensions, and which require a more detailed representation of anatomy.",
        "translation": "一个关键问题是哪些特征在不同模型维度下保持一致，哪些需要更详细的解剖结构表达。",
        "pronunciationTip": "重读 which features 和 which require；在逗号处停顿，使两个比较问题听起来清楚对称。",
        "question": "How would you determine whether a simplified model is sufficient?",
        "answerHint": "说明比较对象、物理指标与任务指标；不能仅凭分类结果相近就断言二维与三维等价。",
        "keywords": [
          "model dimensions",
          "consistent features",
          "anatomy"
        ]
      },
      {
        "id": "day-07",
        "day": 7,
        "topic": "说明模型验证",
        "sentence": "I distinguish numerical verification from experimental validation, because a stable simulation does not automatically represent the physical system accurately.",
        "translation": "我区分数值验证与实验确认，因为计算稳定并不自动意味着仿真准确代表真实物理系统。",
        "pronunciationTip": "numerical verification 与 experimental validation 要慢读并形成对照；在 because 前停顿。",
        "question": "How do you assess the credibility of your simulations?",
        "answerHint": "按照实际完成情况讲网格或时间步检查、边界条件和仿体对照；尚未完成的验证要直接说明。",
        "keywords": [
          "verification",
          "validation",
          "physical system"
        ]
      },
      {
        "id": "day-08",
        "day": 8,
        "topic": "解释仿真数据价值",
        "sentence": "Simulation data allow controlled variation of physical parameters, which helps me investigate learning problems that limited recordings alone cannot fully address.",
        "translation": "仿真数据允许有控制地改变物理参数，帮助我研究仅凭有限实测数据难以充分处理的学习问题。",
        "pronunciationTip": "controlled variation 是重音中心；在 which 前停顿，后半句重点是 limited recordings。",
        "question": "What is the main benefit of using simulated data?",
        "answerHint": "用实际改变过的参数举例，再说明仿真如何补充实测数据；不要将可控性说成真实性保证。",
        "keywords": [
          "simulation data",
          "physical parameters",
          "limited recordings"
        ]
      },
      {
        "id": "day-09",
        "day": 9,
        "topic": "承认仿真局限",
        "sentence": "The main limitation is that simulated signals may differ from recordings because of uncertain physiology, sensor responses, and environmental noise.",
        "translation": "主要局限是生理状态的不确定性、传感器响应和环境噪声可能使仿真信号与实测信号不同。",
        "pronunciationTip": "先清楚读出 main limitation；三个差异来源逐项表达，在 sensor responses 后稍作停顿。",
        "question": "Where does the gap between simulation and measurement come from?",
        "answerHint": "区分已观察到的域差异与合理假设；尽量说明用什么实验能够检验每个差异来源。",
        "keywords": [
          "simulation gap",
          "sensor responses",
          "environmental noise"
        ]
      },
      {
        "id": "day-10",
        "day": 10,
        "topic": "解释迁移学习",
        "sentence": "My aim is to transfer useful structure from simulated signals while adapting the model to the characteristics of real recordings.",
        "translation": "我的目标是迁移仿真信号中的有效结构，同时使模型适应真实采集信号的特点。",
        "pronunciationTip": "transfer useful structure 与 adapting the model 是两个动作重点；while 前轻停顿。",
        "question": "How does transfer learning support your research?",
        "answerHint": "明确源域、目标域、迁移的对象和基线；只报告你实际使用过或明确计划比较的方法。",
        "keywords": [
          "transfer learning",
          "simulated signals",
          "real recordings"
        ]
      },
      {
        "id": "day-11",
        "day": 11,
        "topic": "解释少样本设定",
        "sentence": "For limited labeled data, I would compare transfer learning against training from scratch under the same data splits and annotation budget.",
        "translation": "在标注数据有限的情况下，我会在相同数据划分和标注预算下，比较迁移学习与从头训练。",
        "pronunciationTip": "limited labeled data 可以放慢；突出 same data splits 与 annotation budget，表明比较条件一致。",
        "question": "How would you demonstrate an advantage when labeled data are scarce?",
        "answerHint": "给出计划使用的标注量、重复划分和评价指标；没有做过少样本实验时，用 would 描述计划。",
        "keywords": [
          "limited labeled data",
          "training from scratch",
          "annotation budget"
        ]
      },
      {
        "id": "day-12",
        "day": 12,
        "topic": "解释跨域泛化",
        "sentence": "A model that performs well on one dataset may still fail when the recording device, measurement site, or participant population changes.",
        "translation": "模型即使在一个数据集上表现良好，也可能在设备、测量位置或受试人群变化时失效。",
        "pronunciationTip": "在 may still fail 处加强语气；三个变化来源用平行节奏读出。",
        "question": "What does generalization mean in your application?",
        "answerHint": "说明你最关心的域变化；将跨记录、跨受试者、跨设备和跨中心验证区分开。",
        "keywords": [
          "generalization",
          "recording device",
          "participant population"
        ]
      },
      {
        "id": "day-13",
        "day": 13,
        "topic": "说明数据划分",
        "sentence": "When evaluating generalization, I would keep recordings from the same participant together to reduce the risk of information leakage.",
        "translation": "评价泛化能力时，我会将同一受试者的记录放在同一数据分组中，以降低信息泄漏风险。",
        "pronunciationTip": "重读 same participant together；information leakage 作为一个意群，在句末清楚收尾。",
        "question": "How would you prevent data leakage during model evaluation?",
        "answerHint": "按真实数据来源讲清分组单位；仿真数据还需考虑相同几何、参数和噪声片段是否跨越训练测试集。",
        "keywords": [
          "participant level split",
          "generalization",
          "information leakage"
        ]
      },
      {
        "id": "day-14",
        "day": 14,
        "topic": "讨论未见条件",
        "sentence": "I would test unseen stenosis conditions separately, because recognizing familiar examples is different from generalizing across a continuous range of severity.",
        "translation": "我会单独测试未见过的狭窄条件，因为识别熟悉样例与跨连续狭窄程度泛化是不同的问题。",
        "pronunciationTip": "突出 unseen stenosis conditions；在 because 前停顿，后半句强调 continuous range。",
        "question": "How would you evaluate performance on stenosis conditions not seen during training?",
        "answerHint": "说明留出哪些程度或几何条件；区分插值、外推与类别识别，不把未见条件泛化笼统称为分类提升。",
        "keywords": [
          "unseen conditions",
          "generalization",
          "stenosis severity"
        ]
      },
      {
        "id": "day-15",
        "day": 15,
        "topic": "解释多位置测量",
        "sentence": "Measurements from different locations may provide complementary information, so I investigate how to combine them without losing their spatial meaning.",
        "translation": "不同位置的测量可能提供互补信息，因此我研究如何在保留空间含义的同时融合这些信息。",
        "pronunciationTip": "complementary information 是核心短语；so 后稍停顿，重读 spatial meaning。",
        "question": "Why might multiple measurement locations improve detection?",
        "answerHint": "从实际布置、信号差异和可能机制回答；互补性需要消融或统计证据，不能只凭通道数量判断。",
        "keywords": [
          "measurement locations",
          "complementary information",
          "spatial meaning"
        ]
      },
      {
        "id": "day-16",
        "day": 16,
        "topic": "说明同步实验",
        "sentence": "Synchronized phantom measurements help assess whether relationships between channels reflect the same physical event rather than differences between recording sessions.",
        "translation": "同步仿体测量有助于判断通道间关系是否反映同一个物理事件，而不是不同采集时段的差异。",
        "pronunciationTip": "先完整读出 Synchronized phantom measurements；same physical event 与 recording sessions 形成重点对照。",
        "question": "Why is synchronization important in your multichannel experiments?",
        "answerHint": "结合你实际完成的同步证明说明其必要性；不要声称非同步公开数据可以证明实时跨通道时序关系。",
        "keywords": [
          "synchronized measurements",
          "phantom",
          "multichannel"
        ]
      },
      {
        "id": "day-17",
        "day": 17,
        "topic": "界定公开数据证据",
        "sentence": "Public datasets can support method evaluation, but recordings collected at different times cannot directly validate assumptions about synchronized channel relationships.",
        "translation": "公开数据集可以支持方法评价，但在不同时刻采集的记录不能直接验证关于同步通道关系的假设。",
        "pronunciationTip": "在 but 前停顿；重读 cannot directly validate，避免把结论表达得过于绝对或含糊。",
        "question": "What can your public dataset experiments establish, and what can they not establish?",
        "answerHint": "分别说明特征学习或分类验证能支持什么，以及同步性、相位关系和真实融合仍需什么实验。",
        "keywords": [
          "public datasets",
          "method evaluation",
          "synchronized channels"
        ]
      },
      {
        "id": "day-18",
        "day": 18,
        "topic": "解释轻量化定位",
        "sentence": "I consider lightweight models because future portable devices will need to balance detection performance with memory use, computation, and energy consumption.",
        "translation": "我考虑轻量化模型，是因为未来便携式设备需要平衡检测性能、内存使用、计算量和能耗。",
        "pronunciationTip": "balance 后四个因素逐项读清；不要把 lightweight models 读得比具体评价因素更重。",
        "question": "Why is model efficiency relevant to your application?",
        "answerHint": "说明预期设备约束和已经评价的指标；参数量下降不能直接等同于实际硬件能耗下降。",
        "keywords": [
          "lightweight models",
          "portable devices",
          "energy consumption"
        ]
      },
      {
        "id": "day-19",
        "day": 19,
        "topic": "界定端侧进展",
        "sentence": "A small model is only a starting point; practical deployment also requires measurements of latency, memory, and reliability on the target hardware.",
        "translation": "小模型只是起点；实际部署还需要在目标硬件上测量延迟、内存使用和可靠性。",
        "pronunciationTip": "分号处明显停顿；重读 on the target hardware，强调评价环境。",
        "question": "What remains to be done before deploying your model on a wearable device?",
        "answerHint": "区分已完成的轻量化设计与未来硬件部署；如果尚未部署，直接说明并给出可执行的验证步骤。",
        "keywords": [
          "deployment",
          "latency",
          "target hardware"
        ]
      },
      {
        "id": "day-20",
        "day": 20,
        "topic": "介绍参考噪声通道",
        "sentence": "An additional reference channel provides information about interference, which may help the model distinguish nuisance variation from signals relevant to stenosis.",
        "translation": "额外的参考通道提供干扰信息，可能帮助模型区分无关变化与狭窄相关信号。",
        "pronunciationTip": "reference channel 和 interference 分开强调；在 which 前停顿，句末 stenosis 读清楚。",
        "question": "What information does your reference noise channel provide?",
        "answerHint": "说明通道采集位置、干扰来源和与主通道的关系；不要默认参考通道只有噪声、完全没有生理信息。",
        "keywords": [
          "reference channel",
          "interference",
          "nuisance variation"
        ]
      },
      {
        "id": "day-21",
        "day": 21,
        "topic": "解释降噪与分类矛盾",
        "sentence": "Reducing apparent noise does not necessarily improve classification, because a filtering method may also remove features that carry useful diagnostic information.",
        "translation": "表观噪声减少不一定改善分类，因为滤波方法也可能去除携带有效判别信息的特征。",
        "pronunciationTip": "重读 does not necessarily；在 because 前停顿，突出 remove features 和 diagnostic information。",
        "question": "Why might classification become worse after denoising?",
        "answerHint": "先描述你真实观察到的现象，再提出并检验原因；不要把可能的解释当成已经证实的机制。",
        "keywords": [
          "denoising",
          "classification",
          "diagnostic information"
        ]
      },
      {
        "id": "day-22",
        "day": 22,
        "topic": "介绍抗干扰学习目标",
        "sentence": "My objective is to learn features that remain useful for stenosis detection while becoming less sensitive to the interference captured by the reference.",
        "translation": "我的目标是学习仍能支持狭窄检测、同时对参考通道所反映干扰更不敏感的特征。",
        "pronunciationTip": "分成 My objective / is to learn features / that remain useful for stenosis detection / while becoming less sensitive to the interference / captured by the reference。",
        "question": "How would you describe the central idea of your noise robust learning approach?",
        "answerHint": "明确学习对象是波形还是表示，参考通道如何进入模型，以及怎样证明抗干扰与判别信息保留同时成立。",
        "keywords": [
          "noise robust features",
          "reference information",
          "stenosis detection"
        ]
      },
      {
        "id": "day-23",
        "day": 23,
        "topic": "解释评价标准",
        "sentence": "I would evaluate both signal quality and downstream performance, while checking whether important physiological features remain stable after processing.",
        "translation": "我会同时评价信号质量与下游任务表现，并检查处理后重要生理特征是否保持稳定。",
        "pronunciationTip": "both signal quality and downstream performance 读出并列关系；在 while 前稍停顿。",
        "question": "How can you show that your processing method is beneficial?",
        "answerHint": "根据是否有干净参考选择信号指标，再加入独立测试、分噪声条件评价和特征检查；分类提升不能单独证明波形恢复准确。",
        "keywords": [
          "signal quality",
          "downstream performance",
          "physiological features"
        ]
      },
      {
        "id": "day-24",
        "day": 24,
        "topic": "防止信息误删",
        "sentence": "I would not force all reference related information to disappear, because the reference channel may contain useful physiological information as well as noise.",
        "translation": "我不会强迫所有与参考通道相关的信息消失，因为参考通道除了噪声，也可能包含有用的生理信息。",
        "pronunciationTip": "强调 not force all；在 because 前停顿，as well as noise 读成补充信息。",
        "question": "Could your reference channel contain information that should be preserved?",
        "answerHint": "讨论信号泄漏、共同生理源和相关但非因果的干扰；提出实际可做的通道检查或控制实验。",
        "keywords": [
          "reference channel",
          "physiological information",
          "information preservation"
        ]
      },
      {
        "id": "day-25",
        "day": 25,
        "topic": "设计消融实验",
        "sentence": "To isolate the value of the reference channel, I would compare matched models with the reference available, removed, or deliberately mismatched.",
        "translation": "为分离参考通道的贡献，我会比较结构匹配的模型，分别使用有效参考、移除参考和故意错配的参考。",
        "pronunciationTip": "先清楚表达 To isolate the value；最后三个实验条件逐项停顿，突出 deliberately mismatched。",
        "question": "Which ablation experiments would test your main hypothesis?",
        "answerHint": "先定义假设，再说明每个对照排除什么解释；错配参考属于研究中的控制条件，并非部署方式。",
        "keywords": [
          "ablation study",
          "reference channel",
          "matched comparison"
        ]
      },
      {
        "id": "day-26",
        "day": 26,
        "topic": "提出物理约束",
        "sentence": "For future work, I would like to incorporate physical constraints that help distinguish plausible physiological changes from artifacts introduced by the model.",
        "translation": "未来我希望引入物理约束，帮助区分合理的生理变化与模型自身引入的伪影。",
        "pronunciationTip": "For future work 清晰表明时间定位；重读 physical constraints 与 plausible physiological changes。",
        "question": "How could physics improve your learning framework?",
        "answerHint": "从实际可观测量和适用物理关系出发，说明约束如何构造及失配风险；不要只使用 physics informed 作为标签。",
        "keywords": [
          "physical constraints",
          "physiological changes",
          "model artifacts"
        ]
      },
      {
        "id": "day-27",
        "day": 27,
        "topic": "说明未来光学方向",
        "sentence": "I would like to extend my research toward optical sensing, especially by connecting hemodynamic changes with measurable variations in photoplethysmographic signals.",
        "translation": "我希望将研究拓展到光学感知，尤其是把血流动力学变化与光电容积描记信号中的可测变化联系起来。",
        "pronunciationTip": "would like to 表明未来意向；photoplethysmographic 较长，练习时先单独慢读，再放回整句。",
        "question": "Why are you interested in moving toward optical wearable sensing?",
        "answerHint": "说明与现有机理建模和抗干扰经验的联系，也坦诚需要学习的光传输、仪器和实验知识。",
        "keywords": [
          "optical sensing",
          "hemodynamics",
          "photoplethysmography"
        ]
      },
      {
        "id": "day-28",
        "day": 28,
        "topic": "提出跨物理场计划",
        "sentence": "A possible next step is to couple a vascular model with light transport and study which physiological parameters can be reliably inferred.",
        "translation": "一个可能的下一步是耦合血管模型与光传输模型，并研究哪些生理参数能够被可靠地反演。",
        "pronunciationTip": "在 next step 后轻停顿；couple、light transport 与 reliably inferred 是三个重点。",
        "question": "What would be a realistic first project in a new optical sensing group?",
        "answerHint": "限定一个可观测信号和少量参数，先做敏感性与可辨识性分析；不要提出一次反演所有生理参数。",
        "keywords": [
          "vascular model",
          "light transport",
          "inverse modeling"
        ]
      },
      {
        "id": "day-29",
        "day": 29,
        "topic": "表达团队匹配",
        "sentence": "I am looking for a group where my experience in simulation and signal analysis can complement expertise in experimental sensing and physiological validation.",
        "translation": "我希望加入这样的团队：我的仿真和信号分析经验可以与团队在实验感知和生理验证方面的专长形成互补。",
        "pronunciationTip": "my experience 与 complement expertise 连贯表达；末尾 experimental sensing and physiological validation 清晰分组。",
        "question": "Why do you think our group would be a good fit for you?",
        "answerHint": "用目标组真实论文中的具体问题替换泛泛表述；说明你能贡献什么，以及希望从团队学习什么。",
        "keywords": [
          "research fit",
          "complementary expertise",
          "physiological validation"
        ]
      },
      {
        "id": "day-30",
        "day": 30,
        "topic": "总结未来研究目标",
        "sentence": "My long term goal is to develop sensing methods whose predictions are supported by physical understanding, careful validation, and realistic deployment requirements.",
        "translation": "我的长期目标是发展由物理理解、严谨验证和现实部署需求共同支撑预测结果的感知方法。",
        "pronunciationTip": "先明确 My long term goal；最后三个支撑条件平行表达，句末 requirements 放缓收尾。",
        "question": "What would you like to achieve during your postdoctoral training?",
        "answerHint": "将长期方向拆为可完成的项目、需要补齐的能力和验证里程碑；避免只说发表高水平论文。",
        "keywords": [
          "postdoctoral goals",
          "physical understanding",
          "careful validation"
        ]
      }
    ],
    "intro": {
      "short": "My doctoral research focuses on acoustic sensing for stenosis detection in arteriovenous fistulas. I connect numerical modeling with simulation assisted learning, multisite signal analysis, and lightweight model design. I also study how a reference noise channel can support more robust detection. For my next stage, I would like to combine this background with optical sensing and physics informed methods, supported by careful experimental validation.",
      "full": "My doctoral research focuses on acoustic sensing and numerical modeling for stenosis detection in arteriovenous fistulas. I study how stenosis location and severity influence flow related acoustic characteristics, using two and three dimensional models to examine the value and limitations of simplified representations.\n\nA second part of my work concerns simulation assisted learning: how can information from controlled numerical experiments support detection when real recordings are limited? I also work on multisite signal analysis and lightweight models, with future portable sensing applications in mind.\n\nAnother question comes from noise processing. A signal can appear cleaner while becoming less useful for classification. I therefore investigate how an additional reference noise channel can help learning retain relevant information and reduce sensitivity to interference. This requires evaluating both the signal and the downstream task, rather than relying on a single metric.\n\nFor a postdoctoral position, I would like to extend these ideas toward optical sensing and inverse modeling. I am especially interested in connecting hemodynamic models with light transport, assessing which parameters are identifiable, and validating the resulting methods experimentally. I hope to contribute my modeling and signal analysis experience while developing stronger expertise in optical instrumentation and physiological validation.",
      "chinese": "我的博士研究聚焦于动静脉内瘘狭窄的声学感知与数值建模。我利用二维和三维模型研究狭窄位置与程度对流动相关声学特征的影响，同时分析简化模型的价值和局限。另一部分工作关注如何利用数值实验生成的信息，在实测数据有限时辅助检测。我也开展多位置声学分析和轻量化模型研究，为未来便携式感知做准备。针对降噪后分类表现可能变差的问题，我研究如何借助额外参考噪声通道，保留任务相关信息并降低模型对干扰的敏感性。未来博后阶段，我希望向光学感知与逆问题拓展，将血流动力学与光传输连接起来，先分析参数是否能够可靠辨识，再开展实验验证。以上光学方向是未来计划，轻量化设计也不等同于已经完成真实设备部署。"
    },
    "questions": [
      {
        "id": "interview-01",
        "question": "Could you introduce your research and explain the question that connects your thesis chapters?",
        "category": "研究介绍",
        "structure": "研究对象与需求 → 一条共同科学问题 → 四项工作的衔接 → 你亲自承担的内容。控制在90秒，优先用真实结果与明确边界。"
      },
      {
        "id": "interview-02",
        "question": "What is the most important original contribution of your doctoral work?",
        "category": "创新与贡献",
        "structure": "已有方法的具体不足 → 你的方法或发现 → 最有说服力的实验 → 仍未解决的问题。只选已有证据支持的一项贡献，不编造领先程度。"
      },
      {
        "id": "interview-03",
        "question": "How did you verify your numerical implementation and validate the physical assumptions of your model?",
        "category": "数值建模",
        "structure": "方程与假设 → 实际完成的收敛或基准检查 → 仿体或实测对照 → 主要不确定性。明确区分数值验证与物理真实性验证。"
      },
      {
        "id": "interview-04",
        "question": "When is a two dimensional model sufficient, and when would you need a three dimensional model?",
        "category": "模型选择",
        "structure": "目标量 → 2D可以表达的机制 → 3D引入的空间效应 → 你实际比较过的证据 → 计算成本与适用范围。"
      },
      {
        "id": "interview-05",
        "question": "How would you demonstrate that simulated data improve learning on real recordings rather than introduce misleading shortcuts?",
        "category": "仿真到实测",
        "structure": "明确源域与目标域 → 实测基线 → 控制标注预算的比较 → 按受试者或仿真条件独立划分 → 负迁移与捷径学习检查。计划中的实验要用 would。"
      },
      {
        "id": "interview-06",
        "question": "How would you evaluate robustness when labels are limited and the measurement conditions change?",
        "category": "少样本与跨域",
        "structure": "限定一种域变化 → 逐级减少目标域标注 → 相同预算下比较方法 → 多次独立划分与不确定性 → 未见条件的专门测试。"
      },
      {
        "id": "interview-07",
        "question": "Why can denoising reduce classification performance, and how does your reference channel help address this problem?",
        "category": "参考噪声与鲁棒学习",
        "structure": "真实观察 → 可能损失的判别信息 → 参考通道实际提供什么 → 你的学习目标与实现 → 信号和任务两层评价。将解释假设与已验证机制分开。"
      },
      {
        "id": "interview-08",
        "question": "Which experiments would show that your model preserves useful physiological information rather than merely exploiting correlations?",
        "category": "实验设计",
        "structure": "需要保留的具体信息 → 有效参考、无参考与错配参考消融 → 噪声和生理条件分别变化 → 独立测试 → 失败情形。不要把分类精度等同于因果或生理正确性。"
      },
      {
        "id": "interview-09",
        "question": "What are the main limitations of your current work, and which one would you address first?",
        "category": "局限与判断",
        "structure": "选择一个真实且重要的局限 → 它对结论的具体影响 → 现有证据能支持到哪里 → 下一步可行实验 → 完成后如何改变判断。"
      },
      {
        "id": "interview-10",
        "question": "How would you extend your experience to optical sensing without making the first project too ambitious?",
        "category": "未来光学方向",
        "structure": "能迁移的建模或信号经验 → 需要补齐的光学能力 → 单一测量模态和少量参数 → 敏感性与可辨识性分析 → 最小仿体验证。明确这是拟开展方向。"
      },
      {
        "id": "interview-11",
        "question": "Why are you interested in our group, and what would you contribute during your first six months?",
        "category": "团队匹配",
        "structure": "选目标组一篇已读论文 → 说明尚存问题与你经验的联系 → 可交付的小项目 → 需要的合作和资源 → 三个月与六个月检查点。不要虚构已具备的仪器经验。"
      },
      {
        "id": "interview-12",
        "question": "Can you describe a research setback, how you responded, and what you learned from it?",
        "category": "研究能力与合作",
        "structure": "真实背景 → 你的责任 → 具体困难 → 你采取的行动与协作 → 实际结果 → 对后续设计的改变。可以使用降噪后分类下降的真实经历，但不补造数据或团队冲突。"
      }
    ]
  },
  "checkedAt": "2026-10-12"
};
