import bcrypt from "bcryptjs";
import { CreateUserDTO } from "../dto/user.dto";
import { Role, Status } from "../common/enums/enums";
import User from "../models/user.mode";
import tokenService from "./token.service";
import { CustomError } from "../common/errors/CustomError";


class AuthService {
  public async adminSignup(createUserDto: CreateUserDTO) {
    const { username, email, password, avatar } = createUserDto;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.status === Status.INACTIVE) {
        throw new CustomError("Sorry! This account is inactive. Please contact support.", 400);
      }
      throw new CustomError("Sorry! This email is already taken.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      avatar,
    });

    await newUser.save();

    const accessToken = tokenService.generateAccessToken(newUser._id.toString());
    const refreshToken = tokenService.generateRefreshToken(newUser._id.toString());

    const responseUserDTO = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      role: newUser.role,
      tokens: { accessToken, refreshToken },
    };

    return responseUserDTO;
  }

  public async adminSignin(email: string, password: string) {
    const user = await User
      .findOne
      ({
        email,
        status: Status.ACTIVE,
      });

    if (!user) {
      throw new CustomError("Sorry! This email is not registered.", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Sorry! Invalid username or password.", 400);
    }

    const accessToken = tokenService.generateAccessToken(user._id.toString());
    const refreshToken = tokenService.generateRefreshToken(user._id.toString());

    const responseUserDTO = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      tokens: { accessToken, refreshToken },
    };

    return responseUserDTO;

  }

  public async webSignup(createUserDto: CreateUserDTO) {
    const { username, email, password, avatar } = createUserDto;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.status === Status.INACTIVE) {
        throw new CustomError("Sorry! This account is inactive. Please contact support.", 400);
      }
      throw new CustomError("Sorry! This email is already taken.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: Role.GUEST,
      avatar,
    });

    await newUser.save();

    const accessToken = tokenService.generateAccessToken(newUser._id.toString());
    const refreshToken = tokenService.generateRefreshToken(newUser._id.toString());

    const responseUserDTO = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      role: newUser.role,
      tokens: { accessToken, refreshToken },
    };

    return responseUserDTO;
  }

  public async webSignin(email: string, password: string) {
    const user = await User
      .findOne
      ({
        email,
        status: Status.ACTIVE,
      });

    if (!user) {
      throw new CustomError("Sorry! This email is not registered.", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Sorry! Invalid username or password.", 400);
    }

    const accessToken = tokenService.generateAccessToken(user._id.toString());
    const refreshToken = tokenService.generateRefreshToken(user._id.toString());

    const responseUserDTO = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      tokens: { accessToken, refreshToken },
    };

    return responseUserDTO;

  }

  

  public async generateAccessToken(refreshToken: string) {
    const {userId} = tokenService.extractToken(refreshToken);
    const user
      = await User.findById(userId);
    if(!user || user.status === Status.INACTIVE){
      throw new CustomError("Access denied", 401);
    }

    const accessToken = tokenService.generateAccessToken(user._id.toString());
    return { accessToken };
  }
}

export default new AuthService();
