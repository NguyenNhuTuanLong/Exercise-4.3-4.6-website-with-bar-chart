// --- BÀI 4.3: TẠO KHUNG SVG ---
const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 1200 1600")
              .style("border", "1px solid black");

// --- BÀI 4.4: NẠP VÀ XỬ LÝ DỮ LIỆU TỪ CSV ---
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Chuyển chuỗi thành số
    };
}).then(data => {
    console.log("Dữ liệu thô:", data);
    console.log("Số lượng dòng:", data.length);
    console.log("Giá trị max:", d3.max(data, d => d.count));
    console.log("Giá trị min:", d3.min(data, d => d.count));

    // Sắp xếp dữ liệu từ cao xuống thấp
    data.sort((a, b) => b.count - a.count);

    // Gọi hàm vẽ biểu đồ
    drawBarChart(data);
});

// --- BÀI 4.5: HÀM VẼ BIỂU ĐỒ CỘT (Thay thế hàm rỗng cũ) ---
const drawBarChart = data => {
    const barHeight = 20;
    const barSpacing = 5;

    svg.selectAll("rect")
       .data(data)
       .join("rect")
       .attr("class", d => {
           // In dữ liệu từng dòng ra để kiểm tra
           console.log(d);
           return `bar bar-${d.count}`;
       })
       .attr("width", d => d.count)
       .attr("height", barHeight)
       .attr("fill", "blue")
       .attr("x", 0)
       .attr("y", (d, i) => i * (barHeight + barSpacing));
};