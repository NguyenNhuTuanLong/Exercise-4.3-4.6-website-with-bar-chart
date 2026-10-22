// ==========================================================
// BƯỚC 1: KHỞI TẠO KHUNG SVG CHỨA BIỂU ĐỒ (Bài 4.3 & 4.6)
// ==========================================================
// Tạo thẻ <svg> bên trong <div>, đặt kích thước viewBox là 500x500
const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 500 500")
              .style("border", "1px solid black");

// ==========================================================
// BƯỚC 2: NẠP VÀ XỬ LÝ DỮ LIỆU TỪ FILE CSV (Bài 4.4)
// ==========================================================
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Dấu + để ép kiểu chuỗi chữ (string) thành số (number)
    };
}).then(data => {
    // Sắp xếp dữ liệu từ giá trị đếm lớn nhất đến nhỏ nhất
    data.sort((a, b) => b.count - a.count);

    // Gọi hàm vẽ biểu đồ khi dữ liệu đã chuẩn bị xong
    drawBarChart(data);
});

// ==========================================================
// BƯỚC 3: HÀM VẼ BIỂU ĐỒ CỘT HOÀN CHỈNH (Bài 4.5 -> 4.7)
// ==========================================================
const drawBarChart = data => {
    
    // --- 3.1. KHỞI TẠO CÁC HÀM TỶ LỆ (SCALES) ---
    // xScale: Giới hạn chiều rộng của thanh cột.
    // Chỉnh range xuống 350px để chừa khoảng trống bên phải cho chữ số hiển thị mà không bị cắt viền.
    const xScale = d3.scaleLinear()
                     .domain([0, 1100])
                     .range([0, 350]); 

    // yScale: Chia đều khoảng cách các cột theo chiều dọc và tạo khoảng hở (padding: 0.1)
    const yScale = d3.scaleBand()
                     .domain(data.map(d => d.brand))
                     .range([0, 500])
                     .padding(0.1);

    // --- 3.2. TẠO NHÓM (GROUP) ĐỂ CHỨA CỘT VÀ CHỮ ---
    // Dùng thẻ <g> để nhóm hình khối và văn bản lại với nhau
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        // Dịch chuyển mỗi thẻ <g> xuống đúng tọa độ Y dựa trên tên hãng
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // --- 3.3. VẼ CÁC THANH CỘT MÀU XANH ---
    barAndLabel
        .append("rect")
        .attr("width", d => xScale(d.count))  // Chiều dài tự động tính qua xScale
        .attr("height", yScale.bandwidth())   // Độ dày tự động tính qua yScale
        .attr("fill", "blue")
        .attr("x", 100) // Đẩy lùi cột sang phải 100px để chừa chỗ trống cho tên hãng
        .attr("y", 0);  // Đặt Y = 0 vì toàn bộ nhóm <g> đã được dịch chuyển ở bước trên

    // --- 3.4. THÊM NHÃN TÊN HÃNG TV (BÊN TRÁI) ---
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 90) // Đặt chữ cách lề trái 90px (sát ngay viền trái thanh cột)
        .attr("y", 15) // Canh Y để chữ nằm lọt giữa độ dày của thanh cột
        .attr("text-anchor", "end") // Căn lề phải để chữ không bị thò thụt
        .style("font-size", "13px");

    // --- 3.5. THÊM NHÃN SỐ LƯỢNG ĐẾM (BÊN PHẢI) ---
    barAndLabel
        .append("text")
        .text(d => d.count)
        // Tọa độ X = 100px lề trống + độ dài thực của thanh cột + 4px tạo khoảng cách nhỏ
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12) // Canh Y để chữ nằm lọt giữa độ dày của thanh cột
        .style("font-size", "13px");
};