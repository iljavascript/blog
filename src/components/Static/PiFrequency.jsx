import { useState, useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  display: grid;
  gap: 8px;
  color: #333;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Title = styled.div`
  line-height: 1.4;
  font-weight: 600;
`;

const Grid = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9em;
`;

const Button = styled.button`
  height: 40px;
  padding: 0 16px;
  background: ${({ disabled }) => disabled ? "#bac8e0" : "#4A6FE3"};
  border-radius: 8px;
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Chart = styled.div`
  height: 124px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
`;

const ChartItem = styled.div`
  display: grid;
  align-content: end;
`;

const Bar = styled.div`
  border-radius: 8px 8px 0 0;
  background: ${({ color }) => color || "#00c6ff"};
`;

const Label = styled.div`
  height: 24px;
  text-align: center;
  line-height: 24px;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 0.75em;
`;

const Item = styled.div`
  height: 24px;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 24px;
`;

export default function PiFrequency() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [freq, setFreq] = useState(Array(10).fill(0));
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ message: "等待加载 ...", time: "—" });

  const CHUNK_SIZE = 5;
  const TOTAL_FILES = 200;
  const COLORS = Array.from({ length: 10 }, (_, i) => {
    const hue = Math.round((i * 360) / 10);
    return `hsl(${hue}, 100%, 60%)`;
  });

  const handleAnalyze = useCallback(async () => {
    if (loading) return;

    let s = start ? Number(start) : 1;
    let e = end ? Number(end) : 200000000;

    if (s < 1) s = 1;
    if (e > 200000000) e = 200000000;
    if (s >= e) {
      setInfo({ message: "结束范围必须大于开始范围", time: "—" });
      return;
    }

    setStart(s);
    setEnd(e);

    setLoading(true);
    setFreq(Array(10).fill(0));
    setInfo({ message: "分析中 ... 0%", time: "—" });

    const startTime = performance.now();
    const counts = Array(10).fill(0);
    let globalPos = 0;

    try {
      for (let batchStart = 0; batchStart < TOTAL_FILES; batchStart += CHUNK_SIZE) {
        const batch = Array.from(
          { length: Math.min(CHUNK_SIZE, TOTAL_FILES - batchStart) },
          (_, i) => batchStart + i + 1
        );

        const results = await Promise.allSettled(
          batch.map(async (n) => {
            const part = String(n).padStart(3, "0");
            const res = await fetch(
              `https://iluelyar.github.io/pi-data/pi_part_${part}.txt`
            );
            if (!res.ok) throw new Error(`第 ${n} 段加载失败`);
            return res.text();
          })
        );

        const texts = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value || "");

        for (const text of texts) {
          const len = text.length;
          if (globalPos + len < s) {
            globalPos += len;
            continue;
          }
          for (let i = 0; i < len; i++) {
            const pos = globalPos + i;
            if (pos < s - 1) continue;
            if (pos >= e) break;
            const d = text.charCodeAt(i) - 48;
            if (d >= 0 && d <= 9) counts[d]++;
          }
          globalPos += len;
          if (globalPos >= e) break;
        }

        const percent = Math.min(Math.floor((globalPos / (e - s + 1)) * 100), 100);
        setInfo((prev) => ({ ...prev, message: `分析中 ... ${percent}%` }));

        if (globalPos >= e) break;
        await new Promise((r) => requestAnimationFrame(r));
      }

      const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
      setFreq(counts);
      setInfo({
        message: "分析完成",
        time: `${totalTime} 秒`,
      });
    } catch (err) {
      setInfo({ message: `错误：${err.message}`, time: "—" });
    } finally {
      setLoading(false);
    }
  }, [start, end]);


  const maxCount = Math.max(...freq);
  const minCount = Math.min(...freq);
  const hasZero = freq.some(c => c === 0);
  const minHeight = hasZero ? 0 : 20;

  return (
    <Wrapper>
      <Image src="./img/pi.png" alt="π" />
      <Title>圆周率小数位数字频率可视化</Title>
      <Grid onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
        <Input
          type="number"
          min="1"
          max="200000000"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          disabled={loading}
          placeholder="起始位"
        />
        <Input
          type="number"
          min="1"
          max="200000000"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          disabled={loading}
          placeholder="结束位"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "分析中 ..." : "开始分析"}
        </Button>
      </Grid>
      <Info>
        <Item>范围: {start} - {end}</Item>
        <Item>长度: {end - start + 1}</Item>
        <Item>状态: {info.message}</Item>
        <Item>耗时: {info.time}</Item>
        <Item>[0-9] 出现次数 / 出现频率</Item>
        {info.message === "分析完成" &&
          freq.map((count, i) => (
            <Item>[{i}] {count.toLocaleString()} / {(count / (end - start) * 100).toFixed(4)}%</Item>
          ))
        }
      </Info>
      {info.message === "分析完成" && (
        <Chart>
          {freq.map((count, i) => {
            const height =
              maxCount !== minCount
                ? minHeight + ((count - minCount) / (maxCount - minCount)) * (100 - minHeight)
                : 100;
            return (
              <ChartItem key={i}>
                <Bar style={{ height: `${height}px` }} color={COLORS[i]}></Bar>
                <Label>{i}</Label>
              </ChartItem>
            );
          })}
        </Chart>
      )}
    </Wrapper>
  );
}
