"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.post('/api/adplist-review', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const response = yield axios_1.default.get(`https://api2.adplist.org/core/review/?user_id=${userId}`);
        res.json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}));
app.post('/api/senja-testimonial', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senjaApiKey, adpListReviews } = req.body;
    try {
        const results = yield Promise.all(adpListReviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
            const testimonialData = {
                type: "text",
                title: `Mentorship Call with ${review.mentor.name}`,
                text: review.review,
                rating: review.rating,
                url: review.swag_image_url,
                date: review.date_reviewed,
                approved: true,
                thumbnail_url: "",
                customer_name: review.reviewed_by.name,
                customer_company: review.reviewed_by.employer,
                customer_avatar: review.reviewed_by.profile_photo_url,
            };
            const response = yield axios_1.default.post('https://api.senja.io/v1/testimonials', testimonialData, {
                headers: {
                    'Authorization': `Bearer ${senjaApiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        })));
        res.json(results);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
