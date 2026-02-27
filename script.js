// 易经六爻占卜软件 - 核心逻辑文件
// 作者：元宝
// 版本：2.0

// ==================== 全局变量和配置 ====================
let currentStep = 0;              // 当前摇卦步骤 (0-5)
let yaoResults = [];              // 存储六爻结果：0=阴, 1=阳
let yaoTypes = [];                // 存储爻的类型：0=老阴, 1=少阳, 2=少阴, 3=老阳
let isTossing = false;            // 是否正在摇卦中
let history = [];                 // 历史记录数组
const MAX_HISTORY = 50;           // 最大历史记录数
const yaoPositions = ["初爻", "二爻", "三爻", "三爻", "四爻", "五爻", "上爻"]; // 爻位名称

// DOM元素引用
let coins, statusEl, progressBar, tossButton, autoButton, resetButton;
let yaoSequenceEl, resultDisplay, changeYaoContainer, changeYaoContent;
let historyContainer, helpModal;

// ==================== 初始化函数 ====================
function init() {
    // 获取DOM元素
    coins = [
        document.getElementById('coin1'),
        document.getElementById('coin2'),
        document.getElementById('coin3')
    ];
    statusEl = document.getElementById('status');
    progressBar = document.getElementById('progressBar');
    tossButton = document.getElementById('tossButton');
    autoButton = document.getElementById('autoButton');
    resetButton = document.getElementById('resetButton');
    yaoSequenceEl = document.getElementById('yaoSequence');
    resultDisplay = document.getElementById('resultDisplay');
    changeYaoContainer = document.getElementById('changeYaoContainer');
    changeYaoContent = document.getElementById('changeYaoContent');
    historyContainer = document.getElementById('historyContainer');
    helpModal = document.getElementById('helpModal');
    
    // 加载历史记录
    loadHistory();
    
    // 更新显示状态
    updateStatus();
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', handleKeyDown);
    
    // 添加模态框外部点击关闭
    window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            closeHelp();
        }
    });
    
    // 显示欢迎消息
    setTimeout(() => {
        showMessage("欢迎使用易经六爻占卜软件！按空格键摇卦，R键重置，A键一键摇六次，H键查看帮助，E键导出结果", "info");
    }, 1000);
}

// ==================== 摇卦相关函数 ====================

/**
 * 单次摇卦
 */
function tossCoins() {
    // 检查是否可以摇卦
    if (isTossing || currentStep >= 6) {
        if (currentStep >= 6) {
            showMessage("已完成六次摇卦，请查看结果或重新开始。", "info");
        }
        return;
    }
    
    // 设置状态
    isTossing = true;
    tossButton.disabled = true;
    autoButton.disabled = true;
    
    // 更新状态显示
    statusEl.textContent = `正在摇第${currentStep + 1}次卦...`;
    statusEl.style.color = "#D2691E";
    
    // 添加摇卦动画
    coins.forEach(coin => {
        coin.classList.add('tossing');
    });
    
    // 延迟执行摇卦结果（模拟摇卦过程）
    setTimeout(() => {
        processTossResult();
    }, 800);
}

/**
 * 处理摇卦结果
 */
function processTossResult() {
    // 生成三枚铜钱的随机结果
    const results = [
        Math.random() < 0.5 ? 0 : 1,
        Math.random() < 0.5 ? 0 : 1,
        Math.random() < 0.5 ? 0 : 1
    ];
    
    // 计算阳面数量
    const yangCount = results.reduce((sum, val) => sum + val, 0);
    
    // 判断爻的类型
    let yaoType, yaoValue;
    
    if (yangCount === 3) {        // 三阳：老阳
        yaoType = 3;
        yaoValue = 1;
    } else if (yangCount === 2) { // 二阳一阴：少阴
        yaoType = 2;
        yaoValue = 0;
    } else if (yangCount === 1) { // 一阳二阴：少阳
        yaoType = 1;
        yaoValue = 1;
    } else {                      // 三阴：老阴
        yaoType = 0;
        yaoValue = 0;
    }
    
    // 更新铜钱显示
    coins.forEach((coin, index) => {
        coin.classList.remove('tossing');
        coin.classList.remove('yang', 'yin');
        
        if (results[index] === 1) {
            coin.classList.add('yang');
            coin.innerHTML = '<div class="coin-text">满<br>文</div>';
        } else {
            coin.classList.add('yin');
            coin.innerHTML = '<div class="coin-text">乾<br>隆<br>通<br>宝</div>';
        }
    });
    
    // 存储结果
    yaoResults.push(yaoValue);
    yaoTypes.push(yaoType);
    
    // 更新进度条
    currentStep++;
    progressBar.style.width = `${(currentStep / 6) * 100}%`;
    
    // 更新爻序列显示
    updateYaoDisplay();
    
    // 判断是否完成六次摇卦
    if (currentStep >= 6) {
        setTimeout(() => {
            showResults();
            saveToHistory();
            statusEl.textContent = "摇卦完成！";
            statusEl.style.color = "#2E8B57";
            showMessage("摇卦完成！卦象解读已生成。", "success");
        }, 500);
    } else {
        statusEl.textContent = `已摇${currentStep}次，准备摇第${currentStep + 1}次`;
        statusEl.style.color = "#8B4513";
    }
    
    // 重置状态
    isTossing = false;
    tossButton.disabled = false;
    autoButton.disabled = false;
}

/**
 * 手动设置单个铜钱
 * @param {number} coinIndex - 铜钱索引 (0, 1, 2)
 */
function manualTossCoin(coinIndex) {
    if (currentStep >= 6) {
        showMessage("已完成六次摇卦，请查看结果或重新开始。", "info");
        return;
    }
    
    const coin = coins[coinIndex];
    
    // 切换阴阳
    if (coin.classList.contains('yang')) {
        coin.classList.remove('yang');
        coin.classList.add('yin');
        coin.innerHTML = '<div class="coin-text">乾<br>隆<br>通<br>宝</div>';
    } else {
        coin.classList.remove('yin');
        coin.classList.add('yang');
        coin.innerHTML = '<div class="coin-text">满<br>文</div>';
    }
    
    // 显示提示
    showMessage(`已手动设置第${coinIndex + 1}枚铜钱`, "info");
}

/**
 * 一键摇六次卦
 */
function autoTossAll() {
    if (currentStep >= 6) {
        showMessage("已完成六次摇卦，请查看结果或重新开始。", "info");
        return;
    }
    
    if (!confirm("确定要一键摇六次卦吗？")) {
        return;
    }
    
    // 重置状态
    resetAll();
    
    // 禁用按钮
    tossButton.disabled = true;
    autoButton.disabled = true;
    
    // 逐步摇六次卦
    let step = 0;
    
    function autoTossStep() {
        if (step < 6) {
            // 生成随机结果
            const results = [
                Math.random() < 0.5 ? 0 : 1,
                Math.random() < 0.5 ? 0 : 1,
                Math.random() < 0.5 ? 0 : 1
            ];
            
            // 计算阳面数量
            const yangCount = results.reduce((sum, val) => sum + val, 0);
            
            // 判断爻的类型
            let yaoType, yaoValue;
            
            if (yangCount === 3) {
                yaoType = 3;
                yaoValue = 1;
            } else if (yangCount === 2) {
                yaoType = 2;
                yaoValue = 0;
            } else if (yangCount === 1) {
                yaoType = 1;
                yaoValue = 1;
            } else {
                yaoType = 0;
                yaoValue = 0;
            }
            
            // 存储结果
            yaoResults.push(yaoValue);
            yaoTypes.push(yaoType);
            
            // 更新进度
            currentStep++;
            step++;
            progressBar.style.width = `${(currentStep / 6) * 100}%`;
            statusEl.textContent = `正在摇第${step}次卦...`;
            statusEl.style.color = "#D2691E";
            
            // 更新铜钱显示
            coins.forEach((coin, index) => {
                coin.classList.remove('yang', 'yin');
                
                if (results[index] === 1) {
                    coin.classList.add('yang');
                    coin.innerHTML = '<div class="coin-text">满<br>文</div>';
                } else {
                    coin.classList.add('yin');
                    coin.innerHTML = '<div class="coin-text">乾<br>隆<br>通<br>宝</div>';
                }
            });
            
            // 继续下一步
            setTimeout(autoTossStep, 300);
        } else {
            // 完成
            updateYaoDisplay();
            showResults();
            saveToHistory();
            statusEl.textContent = "一键摇卦完成！";
            statusEl.style.color = "#2E8B57";
            showMessage("一键摇卦完成！卦象解读已生成。", "success");
            
            // 启用按钮
            tossButton.disabled = false;
            autoButton.disabled = false;
        }
    }
    
    // 开始执行
    autoTossStep();
}

/**
 * 重置所有状态
 */
function resetAll() {
    currentStep = 0;
    yaoResults = [];
    yaoTypes = [];
    
    // 重置铜钱显示
    coins.forEach(coin => {
        coin.classList.remove('yang', 'yin', 'tossing');
        coin.innerHTML = '<div class="coin-text">乾<br>隆<br>通<br>宝</div>';
    });
    
    // 重置进度条
    progressBar.style.width = '0%';
    
    // 重置状态显示
    updateStatus();
    
    // 清空爻序列显示
    yaoSequenceEl.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-arrow-up"></i>
            <p>摇卦完成后，爻序列将显示在这里</p>
            <p>初爻在最下方，上爻在最上方</p>
        </div>
    `;
    
    // 清空结果显示
    resultDisplay.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-yin-yang"></i>
            <h3>等待摇卦结果</h3>
            <p>摇卦完成后，卦象解读将显示在这里</p>
        </div>
    `;
    
    // 隐藏变爻信息
    changeYaoContainer.style.display = 'none';
}

/**
 * 更新状态显示
 */
function updateStatus() {
    if (currentStep < 6) {
        statusEl.textContent = `准备摇第${currentStep + 1}次 (${currentStep}/6)`;
        statusEl.style.color = "#8B4513";
        tossButton.disabled = false;
        autoButton.disabled = false;
    } else {
        statusEl.textContent = "摇卦完成！";
        statusEl.style.color = "#2E8B57";
        tossButton.disabled = true;
    }
}

// ==================== 卦象处理函数 ====================

/**
 * 根据三爻获取八卦信息
 * @param {Array} threeYao - 三爻数组 [0,1,0]
 * @returns {Object} 八卦信息
 */
function getBagua(threeYao) {
    const key = threeYao.join('');
    return baguaDict[key] || { name: "未知", element: "未知", nature: "未知", symbol: "?" };
}

/**
 * 根据八卦名称获取八卦信息
 * @param {string} name - 八卦名称
 * @returns {Object} 八卦信息
 */
function getBaguaFromName(name) {
    for (const key in baguaDict) {
        if (baguaDict[key].name === name) {
            return baguaDict[key];
        }
    }
    return { name: "未知", element: "未知", nature: "未知", symbol: "?" };
}

/**
 * 获取卦象解读
 * @param {string} lowerName - 下卦名称
 * @param {string} upperName - 上卦名称
 * @returns {Object} 卦象解读信息
 */
function getGuaInterpretation(lowerName, upperName) {
    const guaKey = lowerName + upperName;
    
    // 直接匹配
    if (guaDict[guaKey]) {
        return guaDict[guaKey];
    }
    
    // 尝试反向匹配
    const reverseKey = upperName + lowerName;
    if (guaDict[reverseKey]) {
        const reversedGua = {...guaDict[reverseKey]};
        // 调整卦名显示
        if (reversedGua.name.includes("为")) {
            const parts = reversedGua.name.split("为");
            if (parts.length === 2) {
                reversedGua.name = parts[1] + "为" + parts[0];
            }
        } else if (reversedGua.name.endsWith("卦")) {
            reversedGua.name = upperName + lowerName + "卦";
        }
        return reversedGua;
    }
    
    // 如果没有匹配，生成自定义卦象
    const lowerBagua = getBaguaFromName(lowerName);
    const upperBagua = getBaguaFromName(upperName);
    
    return {
        name: `${upperName}${lowerName}卦`,
        hexagram: "?",
        sequence: "?",
        description: `上${upperName}下${lowerName}卦，需结合具体情境解读。`,
        detail: `此卦上卦为${upperName}卦（${upperBagua.element}），象征${upperBagua.nature}；下卦为${lowerName}卦（${lowerBagua.element}），象征${lowerBagua.nature}。需结合具体情境和《易经》原文进行详细解读。`
    };
}

// ==================== 显示函数 ====================

/**
 * 更新爻的图形显示
 */
function updateYaoDisplay() {
    yaoSequenceEl.innerHTML = '';
    
    if (yaoResults.length === 0) return;
    
    // 从下往上显示爻（初爻在最下面）
    for (let i = yaoResults.length - 1; i >= 0; i--) {
        const yaoLine = document.createElement('div');
        yaoLine.className = 'yao-line';
        
        // 设置爻的样式
        if (yaoResults[i] === 1) { // 阳爻
            yaoLine.classList.add('yang');
        } else { // 阴爻
            yaoLine.classList.add('yin');
        }
        
        // 如果是变爻，添加标记
        if (yaoTypes[i] === 3) { // 老阳
            yaoLine.classList.add('old-yang');
        } else if (yaoTypes[i] === 0) { // 老阴
            yaoLine.classList.add('old-yin');
        }
        
        // 爻信息
        const yaoInfo = document.createElement('div');
        yaoInfo.className = 'yao-info';
        
        let yaoSymbol, yaoDesc;
        if (yaoTypes[i] === 3) {
            yaoSymbol = "---○";
            yaoDesc = "老阳（变爻）";
        } else if (yaoTypes[i] === 2) {
            yaoSymbol = "- -";
            yaoDesc = "少阴";
        } else if (yaoTypes[i] === 1) {
            yaoSymbol = "---";
            yaoDesc = "少阳";
        } else {
            yaoSymbol = "- -○";
            yaoDesc = "老阴（变爻）";
        }
        
        yaoInfo.innerHTML = `
            <span>${yaoPositions[i]}</span>
            <span>${yaoSymbol} ${yaoDesc}</span>
        `;
        
        yaoSequenceEl.appendChild(yaoInfo);
        yaoSequenceEl.appendChild(yaoLine);
    }
}

/**
 * 显示卦象结果
 */
function showResults() {
    if (yaoResults.length !== 6) return;
    
    // 获取本卦的上下卦
    const lowerYao = yaoResults.slice(0, 3);
    const upperYao = yaoResults.slice(3, 6);
    
    const lowerBagua = getBagua(lowerYao);
    const upperBagua = getBagua(upperYao);
    
    // 获取本卦解读
    const benGua = getGuaInterpretation(lowerBagua.name, upperBagua.name);
    
    // 检查变爻位置
    const changeYaoPositions = [];
    for (let i = 0; i < yaoTypes.length; i++) {
        if (yaoTypes[i] === 0 || yaoTypes[i] === 3) {
            changeYaoPositions.push(i);
        }
    }
    
    // 生成变卦
    let changeGua = null;
    let changeYao = [];
    
    if (changeYaoPositions.length > 0) {
        // 生成变卦的爻
        changeYao = yaoResults.map((value, index) => {
            if (yaoTypes[index] === 3) { // 老阳变阴
                return 0;
            } else if (yaoTypes[index] === 0) { // 老阴变阳
                return 1;
            } else {
                return value; // 少阳少阴不变
            }
        });
        
        // 获取变卦的上下卦
        const lowerChangeYao = changeYao.slice(0, 3);
        const upperChangeYao = changeYao.slice(3, 6);
        
        const lowerChangeBagua = getBagua(lowerChangeYao);
        const upperChangeBagua = getBagua(upperChangeYao);
        
        // 获取变卦解读
        changeGua = getGuaInterpretation(lowerChangeBagua.name, upperChangeBagua.name);
    }
    
    // 构建结果显示HTML
    let resultHTML = `
        <div class="gua-result">
            <div class="gua-name">
                <span class="hexagram">${benGua.hexagram || "?"}</span>
                <span>${benGua.name} ${benGua.sequence ? `(第${benGua.sequence}卦)` : ''}</span>
            </div>
            <p class="gua-description"><strong>卦辞：</strong>${benGua.description}</p>
            ${benGua.detail ? `<p class="gua-description"><strong>解读：</strong>${benGua.detail}</p>` : ''}
            
            <div class="gua-details">
                <div class="detail-item">
                    <h4><i class="fas fa-arrow-up"></i> 上卦（外卦）</h4>
                    <p><strong>${upperBagua.name}卦 ${upperBagua.symbol}</strong></p>
                    <p>象征：${upperBagua.element}</p>
                    <p>属性：${upperBagua.nature}</p>
                </div>
                <div class="detail-item">
                    <h4><i class="fas fa-arrow-down"></i> 下卦（内卦）</h4>
                    <p><strong>${lowerBagua.name}卦 ${lowerBagua.symbol}</strong></p>
                    <p>象征：${lowerBagua.element}</p>
                    <p>属性：${lowerBagua.nature}</p>
                </div>
            </div>
            
            <div class="interpretation">
                <div class="interpretation-title"><i class="fas fa-info-circle"></i> 本卦代表当前状况</div>
                <p>反映事情的基本态势和现状。请结合所问之事，思考卦象的启示。</p>
            </div>
        </div>
    `;
    
    // 添加变卦结果（如果有变爻）
    if (changeGua && changeYaoPositions.length > 0) {
        const lowerChangeYao = changeYao.slice(0, 3);
        const upperChangeYao = changeYao.slice(3, 6);
        const lowerChangeBagua = getBagua(lowerChangeYao);
        const upperChangeBagua = getBagua(upperChangeYao);
        
        resultHTML += `
            <div class="gua-result" style="margin-top: 25px;">
                <div class="gua-name">
                    <span class="hexagram">${changeGua.hexagram || "?"}</span>
                    <span>${changeGua.name} ${changeGua.sequence ? `(第${changeGua.sequence}卦)` : ''}</span>
                </div>
                <p class="gua-description"><strong>卦辞：</strong>${changeGua.description}</p>
                ${changeGua.detail ? `<p class="gua-description"><strong>解读：</strong>${changeGua.detail}</p>` : ''}
                
                <div class="gua-details">
                    <div class="detail-item">
                        <h4><i class="fas fa-arrow-up"></i> 上卦（外卦）</h4>
                        <p><strong>${upperChangeBagua.name}卦 ${upperChangeBagua.symbol}</strong></p>
                        <p>象征：${upperChangeBagua.element}</p>
                        <p>属性：${upperChangeBagua.nature}</p>
                    </div>
                    <div class="detail-item">
                        <h4><i class="fas fa-arrow-down"></i> 下卦（内卦）</h4>
                        <p><strong>${lowerChangeBagua.name}卦 ${lowerChangeBagua.symbol}</strong></p>
                        <p>象征：${lowerChangeBagua.element}</p>
                        <p>属性：${lowerChangeBagua.nature}</p>
                    </div>
                </div>
                
                <div class="interpretation">
                    <div class="interpretation-title"><i class="fas fa-exchange-alt"></i> 变卦代表发展趋势</div>
                    <p>由本卦中的变爻变化而来，显示事情的可能走向。</p>
                </div>
            </div>
        `;
    } else if (changeYaoPositions.length === 0) {
        resultHTML += `
            <div class="gua-result" style="margin-top: 25px;">
                <div class="interpretation">
                    <div class="interpretation-title"><i class="fas fa-info-circle"></i> 无变爻</div>
                    <p>本次摇卦没有变爻，以本卦卦辞为主进行解读。</p>
                    <p><strong>无变爻表示：</strong>事情相对稳定，变化不大，当前态势将持续一段时间。</p>
                </div>
            </div>
        `;
    }
    
    // 更新结果显示
    resultDisplay.innerHTML = resultHTML;
    
    // 显示变爻信息
    if (changeYaoPositions.length > 0) {
        let changeYaoHTML = `
            <p>本次摇卦共有 <strong>${changeYaoPositions.length}</strong> 个变爻：</p>
            <div class="change-yao-list">
        `;
        
        changeYaoPositions.forEach(pos => {
            const positionName = yaoPositions[pos];
            const yaoType = yaoTypes[pos];
            const changeType = yaoType === 3 ? "老阳（阳变阴）" : "老阴（阴变阳）";
            changeYaoHTML += `<div class="change-yao-item">${positionName}: ${changeType}</div>`;
        });
        
        changeYaoHTML += `</div>`;
        
        let changeInterpretation = "";
        if (changeYaoPositions.length === 1) {
            changeInterpretation = "单爻变动，主要关注此爻的变化对整体卦象的影响。";
        } else if (changeYaoPositions.length === 2) {
            changeInterpretation = "双爻变动，需考察两爻之间的相互关系。";
        } else if (changeYaoPositions.length === 3) {
            changeInterpretation = "三爻变动，卦象变化较大，需综合分析。";
        } else if (changeYaoPositions.length > 3) {
            changeInterpretation = "多爻变动，卦象变化显著，事情可能发生重大转变。";
        }
        
        changeYaoHTML += `
            <div style="margin-top: 15px; padding: 10px; background-color: #e8f4f8; border-radius: 8px;">
                <p><strong>解卦要点：</strong>${changeInterpretation}</p>
                <p style="font-size: 0.9em; margin-top: 5px; color: #666;">
                    <i class="fas fa-lightbulb"></i> 变爻是卦象分析的关键，代表事情中正在或即将发生变化的因素。
                </p>
            </div>
        `;
        
        changeYaoContent.innerHTML = changeYaoHTML;
        changeYaoContainer.style.display = 'block';
    } else {
        changeYaoContent.innerHTML = `
            <p>本次摇卦没有变爻。</p>
            <div style="margin-top: 15px; padding: 10px; background-color: #e8f4f8; border-radius: 8px;">
                <p><strong>解卦要点：</strong>无变爻表示事情相对稳定，以本卦卦辞为主进行解读。</p>
            </div>
        `;
        changeYaoContainer.style.display = 'block';
    }
}

// ==================== 历史记录功能 ====================

/**
 * 保存当前结果到历史记录
 */
function saveToHistory() {
    if (yaoResults.length !== 6) return;
    
    // 获取卦象信息
    const lowerYao = yaoResults.slice(0, 3);
    const upperYao = yaoResults.slice(3, 6);
    
    const lowerBagua = getBagua(lowerYao);
    const upperBagua = getBagua(upperYao);
    
    const benGua = getGuaInterpretation(lowerBagua.name, upperBagua.name);
    
    // 创建记录
    const record = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('zh-CN'),
        guaName: benGua.name,
        guaSequence: benGua.sequence || "?",
        yaoResults: [...yaoResults],
        yaoTypes: [...yaoTypes],
        lowerBagua: lowerBagua.name,
        upperBagua: upperBagua.name,
        hexagram: benGua.hexagram || "?"
    };
    
    // 添加到历史记录
    history.unshift(record);
    
    // 限制历史记录数量
    if (history.length > MAX_HISTORY) {
        history.pop();
    }
    
    // 保存到本地存储
    localStorage.setItem('iching_history', JSON.stringify(history));
    
    // 更新历史记录显示
    updateHistoryDisplay();
    
    showMessage("占卜结果已保存到历史记录", "success");
}

/**
 * 加载历史记录
 */
function loadHistory() {
    const savedHistory = localStorage.getItem('iching_history');
    if (savedHistory) {
        try {
            history = JSON.parse(savedHistory) || [];
            updateHistoryDisplay();
        } catch (e) {
            console.error("加载历史记录失败:", e);
            history = [];
            showMessage("历史记录加载失败，已创建新的记录", "warning");
        }
    } else {
        history = [];
    }
}

/**
 * 更新历史记录显示
 */
function updateHistoryDisplay() {
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>暂无历史记录</p>
                <p>摇卦结果将自动保存</p>
            </div>
        `;
        return;
    }
    
    let historyHTML = '';
    history.forEach((record, index) => {
        // 生成爻的简要显示
        let yaoBrief = '';
        for (let i = 0; i < 6 && i < record.yaoResults.length; i++) {
            if (record.yaoResults[i] === 1) {
                yaoBrief += record.yaoTypes[i] === 3 ? "⚊○" : "⚊";
            } else {
                yaoBrief += record.yaoTypes[i] === 0 ? "⚋○" : "⚋";
            }
        }
        
        historyHTML += `
            <div class="history-item" onclick="loadHistoryRecord(${index})" title="点击加载此记录">
                <div class="history-time">
                    <i class="far fa-clock"></i> ${record.timestamp}
                </div>
                <div class="history-gua">
                    <span style="font-size: 1.2em; margin-right: 5px;">${record.hexagram}</span>
                    ${record.guaName} ${record.guaSequence ? `(第${record.guaSequence}卦)` : ''}
                </div>
                <div class="history-yao">
                    <span style="font-family: monospace; letter-spacing: 2px;">${yaoBrief}</span> | 上${record.upperBagua}下${record.lowerBagua}
                </div>
            </div>
        `;
    });
    
    historyContainer.innerHTML = historyHTML;
}

/**
 * 加载历史记录
 * @param {number} index - 历史记录索引
 */
function loadHistoryRecord(index) {
    if (index >= 0 && index < history.length) {
        const record = history[index];
        
        // 设置当前状态
        currentStep = 6;
        yaoResults = [...record.yaoResults];
        yaoTypes = [...record.yaoTypes];
        
        // 更新进度条
        progressBar.style.width = '100%';
        
        // 更新铜钱显示（模拟最后一次摇卦的结果）
        // 注意：历史记录不保存具体的铜钱状态，所以随机显示
        coins.forEach((coin, coinIndex) => {
            coin.classList.remove('yang', 'yin');
            
            // 随机显示铜钱状态
            const isYang = Math.random() > 0.5;
            if (isYang) {
                coin.classList.add('yang');
                coin.innerHTML = '<div class="coin-text">满<br>文</div>';
            } else {
                coin.classList.add('yin');
                coin.innerHTML = '<div class="coin-text">乾<br>隆<br>通<br>宝</div>';
            }
        });
        
        // 更新爻显示
        updateYaoDisplay();
        
        // 显示结果
        showResults();
        
        // 更新状态
        statusEl.textContent = `已加载历史记录: ${record.guaName}`;
        statusEl.style.color = "#2E8B57";
        
        showMessage(`已加载历史记录: ${record.guaName}`, "info");
    }
}

/**
 * 清空历史记录
 */
function clearHistory() {
    if (history.length === 0) {
        showMessage("历史记录已为空", "info");
        return;
    }
    
    if (confirm("确定要清空所有历史记录吗？此操作不可恢复。")) {
        history = [];
        localStorage.removeItem('iching_history');
        updateHistoryDisplay();
        showMessage("历史记录已清空", "success");
    }
}

// ==================== 导出功能 ====================

/**
 * 导出结果为文本文件
 */
function exportResults() {
    if (yaoResults.length !== 6) {
        showMessage("请先完成摇卦再导出", "warning");
        return;
    }
    
    // 获取卦象信息
    const lowerYao = yaoResults.slice(0, 3);
    const upperYao = yaoResults.slice(3, 6);
    
    const lowerBagua = getBagua(lowerYao);
    const upperBagua = getBagua(upperYao);
    
    const benGua = getGuaInterpretation(lowerBagua.name, upperBagua.name);
    
    // 检查变爻位置
    const changeYaoPositions = [];
    for (let i = 0; i < yaoTypes.length; i++) {
        if (yaoTypes[i] === 0 || yaoTypes[i] === 3) {
            changeYaoPositions.push(i);
        }
    }
    
    // 生成变卦（如果有）
    let changeGua = null;
    if (changeYaoPositions.length > 0) {
        const changeYao = yaoResults.map((value, index) => {
            if (yaoTypes[index] === 3) return 0;
            if (yaoTypes[index] === 0) return 1;
            return value;
        });
        
        const lowerChangeYao = changeYao.slice(0, 3);
        const upperChangeYao = changeYao.slice(3, 6);
        
        const lowerChangeBagua = getBagua(lowerChangeYao);
        const upperChangeBagua = getBagua(upperChangeYao);
        
        changeGua = getGuaInterpretation(lowerChangeBagua.name, upperChangeBagua.name);
    }
    
    // 生成文本内容
    let content = "=".repeat(60) + "\n";
    content += "易经六爻占卜结果\n";
    content += "=".repeat(60) + "\n\n";
    
    content += `占卜时间: ${new Date().toLocaleString('zh-CN')}\n`;
    content += `软件版本: 易经六爻占卜软件 v2.0\n\n`;
    
    content += "【本卦信息】\n";
    content += `卦象: ${benGua.name} ${benGua.sequence ? `(第${benGua.sequence}卦)` : ''}\n`;
    content += `卦符: ${benGua.hexagram || "?"}\n`;
    content += `卦辞: ${benGua.description}\n`;
    if (benGua.detail) {
        content += `解读: ${benGua.detail}\n`;
    }
    content += `上卦: ${upperBagua.name}卦 ${upperBagua.symbol} (${upperBagua.element}) - ${upperBagua.nature}\n`;
    content += `下卦: ${lowerBagua.name}卦 ${lowerBagua.symbol} (${lowerBagua.element}) - ${lowerBagua.nature}\n\n`;
    
    content += "【爻序列】\n";
    for (let i = 5; i >= 0; i--) {
        let yaoSymbol = yaoResults[i] === 1 ? "⚊" : "⚋";
        let yaoDesc = "";
        if (yaoTypes[i] === 3) {
            yaoDesc = "老阳（变爻）";
            yaoSymbol = "⚊○";
        } else if (yaoTypes[i] === 2) {
            yaoDesc = "少阴";
        } else if (yaoTypes[i] === 1) {
            yaoDesc = "少阳";
        } else {
            yaoDesc = "老阴（变爻）";
            yaoSymbol = "⚋○";
        }
        content += `${yaoPositions[i]}: ${yaoSymbol} ${yaoDesc}\n`;
    }
    
    if (changeYaoPositions.length > 0) {
        content += `\n【变爻信息】\n`;
        content += `变爻数量: ${changeYaoPositions.length}个\n`;
        changeYaoPositions.forEach(pos => {
            const positionName = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"][pos];
            const changeType = yaoTypes[pos] === 3 ? "老阳（阳变阴）" : "老阴（阴变阳）";
            content += `${positionName}: ${changeType}\n`;
        });
        
        content += `\n【变卦信息】\n`;
        content += `卦象: ${changeGua.name} ${changeGua.sequence ? `(第${changeGua.sequence}卦)` : ''}\n`;
        content += `卦符: ${changeGua.hexagram || "?"}\n`;
        content += `卦辞: ${changeGua.description}\n`;
        if (changeGua.detail) {
            content += `解读: ${changeGua.detail}\n`;
        }
    } else {
        content += `\n【变爻信息】\n`;
        content += `无变爻\n`;
    }
    
    content += "\n" + "=".repeat(60) + "\n";
    content += "《易经》智慧\n";
    content += "=".repeat(60) + "\n";
    content += "1. 卦不妄成，爻不虚发\n";
    content += "2. 天行健，君子以自强不息\n";
    content += "3. 地势坤，君子以厚德载物\n";
    content += "4. 最好的占卜是修养德行、明智决策\n";
    content += "=".repeat(60) + "\n";
    content += "本结果由易经六爻占卜软件生成，仅供参考。\n";
    content += "软件完全在浏览器中运行，不保存任何数据到服务器。\n";
    
    // 创建下载链接
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // 使用卦象名称作为文件名的一部分
    const safeGuaName = benGua.name.replace(/[\/\\:*?"<>|]/g, '');
    const fileName = `易经占卜_${new Date().toISOString().slice(0, 10)}_${safeGuaName}.txt`;
    a.download = fileName;
    a.style.display = 'none';
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showMessage(`结果已导出为: ${fileName}`, "success");
}

// ==================== 帮助和消息功能 ====================

/**
 * 显示帮助模态框
 */
function showHelp() {
    helpModal.style.display = 'flex';
}

/**
 * 关闭帮助模态框
 */
function closeHelp() {
    helpModal.style.display = 'none';
}

/**
 * 显示消息提示
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型: success, info, warning, error
 */
function showMessage(message, type = "info") {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // 根据类型设置颜色
    if (type === "success") {
        messageEl.style.backgroundColor = "#2E8B57";
    } else if (type === "warning") {
        messageEl.style.backgroundColor = "#ff9800";
    } else if (type === "error") {
        messageEl.style.backgroundColor = "#f44336";
    } else {
        messageEl.style.backgroundColor = "#D2691E";
    }
    
    // 添加到页面
    document.body.appendChild(messageEl);
    
    // 添加CSS动画
    if (!document.getElementById('message-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'message-styles';
        styleEl.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // 3秒后移除
    setTimeout(() => {
        messageEl.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => {
            if (messageEl.parentNode) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// ==================== 键盘快捷键处理 ====================

/**
 * 处理键盘快捷键
 * @param {KeyboardEvent} event - 键盘事件
 */
function handleKeyDown(event) {
    // 忽略输入框中的按键
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(event.key.toLowerCase()) {
        case ' ':
            event.preventDefault();
            tossCoins();
            break;
        case 'r':
            event.preventDefault();
            resetAll();
            break;
        case 'a':
            event.preventDefault();
            autoTossAll();
            break;
        case 'h':
            event.preventDefault();
            showHelp();
            break;
        case 'e':
            event.preventDefault();
            exportResults();
            break;
        case 'escape':
            event.preventDefault();
            closeHelp();
            break;
        case '1':
        case '2':
        case '3':
            if (event.ctrlKey) {
                event.preventDefault();
                const index = parseInt(event.key) - 1;
                if (index >= 0 && index < 3) {
                    manualTossCoin(index);
                }
            }
            break;
    }
}

// ==================== 全局函数导出 ====================
// 将需要从HTML调用的函数暴露给全局作用域
window.tossCoins = tossCoins;
window.manualTossCoin = manualTossCoin;
window.autoTossAll = autoTossAll;
window.resetAll = resetAll;
window.clearHistory = clearHistory;
window.exportResults = exportResults;
window.showHelp = showHelp;
window.closeHelp = closeHelp;
window.loadHistoryRecord = loadHistoryRecord;

// ==================== 页面加载完成时初始化 ====================
document.addEventListener('DOMContentLoaded', init);

// ==================== 错误处理 ====================
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    showMessage(`程序出现错误: ${event.message}`, "error");
});

// ==================== 离线支持 ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker注册成功，作用域为: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker注册失败: ', err);
        });
    });
}

// ==================== 页面可见性变化处理 ====================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时的处理
        if (isTossing) {
            showMessage("摇卦已暂停，返回页面可继续", "warning");
        }
    } else {
        // 页面重新显示时的处理
        console.log("页面恢复显示");
    }
});

// ==================== 复制结果到剪贴板功能（可选） ====================
function copyResultsToClipboard() {
    if (yaoResults.length !== 6) {
        showMessage("请先完成摇卦再复制", "warning");
        return;
    }
    
    // 获取结果显示文本
    const resultText = resultDisplay.innerText || resultDisplay.textContent;
    
    // 使用现代Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(resultText).then(() => {
            showMessage("结果已复制到剪贴板", "success");
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopyTextToClipboard(resultText);
        });
    } else {
        fallbackCopyTextToClipboard(resultText);
    }
}

// 降级方案：使用document.execCommand
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showMessage("结果已复制到剪贴板", "success");
        } else {
            showMessage("复制失败，请手动选择文本复制", "error");
        }
    } catch (err) {
        console.error('复制失败:', err);
        showMessage("复制失败，请手动选择文本复制", "error");
    }
    
    document.body.removeChild(textArea);
}

// 暴露复制函数到全局
window.copyResultsToClipboard = copyResultsToClipboard;

// ==================== 页面关闭前提示保存 ====================
window.addEventListener('beforeunload', function(event) {
    if (yaoResults.length > 0 && yaoResults.length < 6) {
        const confirmationMessage = '摇卦尚未完成，确定要离开吗？';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});

// ==================== 打印功能 ====================
function printResults() {
    if (yaoResults.length !== 6) {
        showMessage("请先完成摇卦再打印", "warning");
        return;
    }
    
    // 创建打印内容
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>易经六爻占卜结果</title>
            <style>
                body { font-family: 'Microsoft YaHei', sans-serif; padding: 20px; }
                h1 { color: #8B4513; text-align: center; }
                .gua-result { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
                .gua-name { font-size: 1.5em; font-weight: bold; color: #8B4513; }
                .gua-details { display: flex; margin-top: 15px; }
                .detail-item { flex: 1; padding: 10px; border-left: 3px solid #8B4513; margin: 0 10px; }
                @media print {
                    body { font-size: 12pt; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>易经六爻占卜结果</h1>
            <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
            ${resultDisplay.innerHTML}
            <div class="no-print">
                <p style="text-align: center; margin-top: 30px; color: #666;">
                    本结果由易经六爻占卜软件生成，仅供参考。
                </p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// 暴露打印函数到全局
window.printResults = printResults;