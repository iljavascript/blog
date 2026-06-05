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

const Result = styled.div`
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

export default function PiFinder() {
  const [query, setQuery] = useState("");
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    message: "等待输入 ...",
    time: "—",
  });

  const CHUNK_SIZE = 5;
  const TOTAL_FILES = 200;

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      const q = query.trim();

      // 校验：不能为空
      if (!q) {
        setInfo({ message: "请输入有效数字序列", time: "—" });
        return;
      }

      // 校验：必须全是数字（无空格、无小数点、无符号）
      if (!/^\d+$/.test(q)) {
        setInfo({ message: "只能输入数字", time: "—" });
        return;
      }

      setPositions([]);
      setLoading(true);
      setInfo({ message: "正在搜索 ...", time: "—" });

      const startTime = performance.now();
      const occurrences = [];
      let globalPosition = 0;

      try {
        for (let start = 0; start < TOTAL_FILES; start += CHUNK_SIZE) {
          const batch = Array.from(
            { length: Math.min(CHUNK_SIZE, TOTAL_FILES - start) },
            (_, i) => start + i + 1
          );

          const results = await Promise.allSettled(
            batch.map(async (i) => {
              try {
                const part = String(i).padStart(3, "0");
                const res = await fetch(
                  `https://iluelyar.github.io/pi-data/pi_part_${part}.txt`
                );
                if (!res.ok) throw new Error(`第 ${i} 段加载失败`);
                return res.text();
              } catch (e) {
                console.warn(e.message);
                return "";
              }
            })
          );

          const texts = results
            .filter((r) => r.status === "fulfilled")
            .map((r) => r.value || "");

          for (const text of texts) {
            let idx = text.indexOf(q);
            while (idx !== -1) {
              occurrences.push(globalPosition + idx + 1);
              idx = text.indexOf(q, idx + 1);
            }
            globalPosition += text.length;
          }

          const done = Math.min(start + CHUNK_SIZE, TOTAL_FILES);
          if (done % 10 === 0 || done === TOTAL_FILES) {
            const percent = ((done / TOTAL_FILES) * 100).toFixed(0);
            setInfo((prev) => ({
              ...prev,
              message: `进度 ${percent}%，已发现 ${occurrences.length} 处`,
            }));
          }
        }

        const time = ((performance.now() - startTime) / 1000).toFixed(2);
        setInfo({
          message: occurrences.length
            ? `找到 ${occurrences.length} 处`
            : "未找到匹配项",
          time: `${time} 秒`,
        });
        setPositions(occurrences);
      } catch (err) {
        setInfo({ message: `错误：${err.message}`, time: "—" });
      } finally {
        setLoading(false);
      }
    },
    [query, loading]
  );

  const showCount =
    positions.length > 100 ? positions.slice(0, 100) : positions;

  return (
    <Wrapper>
      <Image src="/img/pi.png" alt="π" />
      <Title>查询数字在圆周率小数位中的出现位置</Title>

      <Grid onSubmit={handleSearch}>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={query}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            setQuery(v);
          }}
          placeholder="请输入数字序列 ..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "搜索中 ..." : "开始搜索"}
        </Button>
      </Grid>

      <Result>
        <Item>范围：前 200,000,000 位</Item>
        <Item>状态：{info.message}</Item>
        <Item>耗时：{info.time}</Item>
        {positions.length > 0 && <Item>位置如下</Item>}
        {showCount.map((pos, i) => (
          <Item key={i}>{pos.toLocaleString()}</Item>
        ))}
        {positions.length > 100 && (
          <Item>……（仅显示前 100 个结果）</Item>
        )}
      </Result>
    </Wrapper>
  );
}
