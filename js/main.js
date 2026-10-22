// --- BƯỚC 1: TẠO KHUNG SVG (Cập nhật kích thước cho Ex 4.6) ---
// Thu nhỏ viewBox xuống còn 500x500 để biểu đồ hiển thị vừa vặn trong khung
const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 500 500")
              .style("border", "1px solid black");

// --- BƯỚC 2: NẠP VÀ XỬ LÝ DỮ LIỆU TỪ CSV ---
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Dấu + giúp ép kiểu chuỗi thành số thực
    };
}).then(data => {
    // In thông số ra Console để kiểm tra dữ liệu
    console.log("Dữ liệu thô:", data);
    console.log("Số lượng dòng:", data.length);
    console.log("Giá trị max:", d3.max(data, d => d.count));
    console.log("Giá trị min:", d3.min(data, d => d.count));

    // Sắp xếp dữ liệu từ giá trị lớn nhất đến nhỏ nhất
    data.sort((a, b) => b.count - a.count);

    // Truyền dữ liệu đã xử lý vào hàm vẽ biểu đồ
    drawBarChart(data);
});

// --- BƯỚC 3: HÀM VẼ BIỂU ĐỒ SỬ DỤNG SCALING (Ex 4.6) ---
const drawBarChart = data => {
    
    // 1. Khai báo tỷ lệ trục X (scaleLinear cho dữ liệu số)
    // Ánh xạ lượng đếm (0 đến 1100) vừa vặn vào chiều rộng SVG (0 đến 500px)
    const xScale = d3.scaleLinear()
                     .domain([0, 1100])
                     .range([0, 500]);

    // 2. Khai báo tỷ lệ trục Y (scaleBand cho dữ liệu phân loại)
    // Ánh xạ tên hãng TV chia đều vào chiều cao SVG (0 đến 500px), tự tạo khoảng trống (padding 0.1)
    const yScale = d3.scaleBand()
                     .domain(data.map(d => d.brand))
                     .range([0, 500])
                     .padding(0.1);

    // 3. Liên kết dữ liệu và vẽ các thanh cột
    svg.selectAll("rect")
       .data(data)
       .join("rect")
       .attr("class", d => {
           console.log(d);
           return `bar bar-${d.count}`;
       })
       // Dùng xScale để tự động tính chiều rộng cột
       .attr("width", d => xScale(d.count))
       // Dùng yScale.bandwidth() để tự động tính độ dày của cột
       .attr("height", yScale.bandwidth())
       .attr("fill", "blue")
       // Trục X luôn bám lề trái (0)
       .attr("x", 0)
       // Dùng yScale để tự động tính tọa độ Y xếp dọc các cột
       .attr("y", (d, i) => yScale(d.brand));
};